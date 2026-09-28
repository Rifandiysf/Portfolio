'use client'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { createExperience, updateExperience } from "@/lib/services/api"
import { revalidateContent } from "@/app/actions/revalidate"
import { Experience, ExperienceFormValues, experienceFormSchema } from "@/lib/schema/experience-schema"
import { TagInput } from "@/components/admin/tag-input";

export function ExperienceForm({ experience, nextOrder, onDone }: {
    experience?: Experience
    nextOrder: number
    onDone: () => void
}) {
    const qc = useQueryClient()
    const { register, control, handleSubmit, formState: { errors } } = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceFormSchema),
        defaultValues: {
            role: experience?.role ?? "",
            companyName: experience?.companyName ?? "",
            date: experience?.date ?? "",
            description: experience?.description ?? "",
            techStack: experience?.techStack ?? [],
            order: experience?.order ?? nextOrder,
        },
    })

    const mutation = useMutation({
        mutationFn: (values: ExperienceFormValues) =>
            experience ? updateExperience({ id: experience.id, data: values }) : createExperience(values),
        onSuccess: async () => {
            await revalidateContent("experiences")
            await qc.invalidateQueries({ queryKey: ["admin", "experiences"] })
            onDone()
        },
    })

    const err = (m?: string) => (m ? <span className="text-xs text-red-500">{m}</span> : null)

    return (
        <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="space-y-5">
            <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <Input id="role" {...register("role")} />
                {err(errors.role?.message)}
            </Field>
            <Field>
                <FieldLabel htmlFor="companyName">Company</FieldLabel>
                <Input id="companyName" {...register("companyName")} />
                {err(errors.companyName?.message)}
            </Field>
            <div className="grid grid-cols-2 gap-4">
                <Field>
                    <FieldLabel htmlFor="date">Date</FieldLabel>
                    <Input id="date" placeholder="2024 - Present" {...register("date")} />
                    {err(errors.date?.message)}
                </Field>
                <Field>
                    <FieldLabel htmlFor="order">Order</FieldLabel>
                    <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
                    <FieldDescription>Angka kecil tampil lebih dulu.</FieldDescription>
                    {err(errors.order?.message)}
                </Field>
            </div>
            <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea id="description" rows={4} {...register("description")} />
                {err(errors.description?.message)}
            </Field>
            <Field>
                <FieldLabel>Tech stack</FieldLabel>
                <Controller
                    control={control}
                    name="techStack"
                    render={({ field }) => <TagInput value={field.value} onChange={field.onChange} placeholder="Next.js, ..." />}
                />
                {err(errors.techStack?.message)}
            </Field>

            {mutation.isError && <p className="text-sm text-red-500">{mutation.error.message}</p>}

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : experience ? "Save changes" : "Add experience"}
            </Button>
        </form>
    )
}