import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodDate } from "zod";

interface Props {
  closeModal(): void;
}

const formSchema = z.object({
  personalData: z.object({
    age: z.number().min(0, "Age must be a positive number"),
    educationLevel: z.string().nonempty("Education level is required"),
  }),
  pregnancyData: z.object({
    startDate: ZodDate,
    gestationalAgeAtRegistration: z
      .number()
      .min(0, "Age must be a positive number"),
    isFirstPregnancy: z.boolean(),
  }),
  pregnancyCauses: z.object({
    unprotectedSex: z.boolean(),
    lackOfSexEducation: z.boolean(),
    socialOrFamilyPressure: z.boolean(),
    other: z.string().optional(),
  }),
  socioeconomicData: z.object({
    socioeconomicLevel: z.string().nonempty("Socioeconomic level is required"),
    accessToHealthAndSexEducation: z.boolean(),
  }),
  geographicData: z.object({
    department: z.string().nonempty("Department is required"),
    zone: z.enum(["rural", "urban"]),
    locality: z.string().nonempty("Locality is required"),
  }),
});

function FormComponent({ closeModal }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="absolute left-56 top-1">
        <button onClick={closeModal}>X</button>
      </div>
      <h2 className="text-center text-3xl">Registrar dato</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <h2>Datos personales de la adolescente:</h2>
        <input
          {...register("personalData.age")}
          placeholder="Edad"
          className="border p-2 rounded"
        />
        {errors.personalData?.age && (
          <span>{errors.personalData.age.message}</span>
        )}

        <input
          {...register("personalData.educationLevel")}
          placeholder="Nivel educativo"
          className="border p-2 rounded"
        />
        {errors.personalData?.educationLevel && (
          <span>{errors.personalData.educationLevel.message}</span>
        )}

        {/* Add the rest of the fields in a similar manner */}
      </form>
    </>
  );
}

export default FormComponent;
