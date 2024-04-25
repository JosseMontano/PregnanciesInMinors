import { useForm } from "react-hook-form";

type FormData = {
    age: number;
    educationLevel: string;
    pregnancyStartDate: string;
    gestationalAge: number;
    isFirstPregnancy: boolean;
    pregnancyCause: string;
    otherCause: string;
    socioeconomicLevel: string;
    accessToHealthServices: boolean;
    department: string;
    area: string;
    locality: string;
};

const AdolescentDataForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-5">

            <div className="flex justify-center gap-3">
                <div className="flex flex-col">
                    <label htmlFor="age">Edad</label>
                    <input {...register("age", { required: true })} type="number" className="border p-2 rounded" />
                    {errors.age && <span className="text-red-500">Este campo es requerido</span>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="educationLevel">Nivel educativo</label>
                    <input {...register("educationLevel", { required: true })} className="border p-2 rounded" />
                    {errors.educationLevel && <span className="text-red-500">Este campo es requerido</span>}
                </div>
            </div>


            <div className="flex justify-center gap-3">
                <div className="flex flex-col">
                    <label htmlFor="pregnancyStartDate">Fecha de inicio del embarazo</label>
                    <input {...register("pregnancyStartDate", { required: true })} type="date" className="border p-2 rounded" />
                    {errors.pregnancyStartDate && <span className="text-red-500">Este campo es requerido</span>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="gestationalAge">Edad gestacional al momento del registro</label>
                    <input {...register("gestationalAge", { required: true })} type="number" className="border p-2 rounded" />
                    {errors.gestationalAge && <span className="text-red-500">Este campo es requerido</span>}
                </div>
            </div>

            <div className="flex justify-center gap-3">
                <div className="flex flex-col">
                    <label htmlFor="isFirstPregnancy">¿Es el primer embarazo?</label>
                    <select {...register("isFirstPregnancy", { required: true })} className="border p-2 rounded">
                        <option value="">Selecciona...</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </select>
                    {errors.isFirstPregnancy && <span className="text-red-500">Este campo es requerido</span>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="pregnancyCause">Causas del embarazo</label>
                    <select {...register("pregnancyCause", { required: true })} className="border p-2 rounded">
                        <option value="">Selecciona...</option>
                        <option value="unprotectedSex">Relaciones sexuales sin protección</option>
                        <option value="lackOfSexEducation">Falta de educación sexual</option>
                        <option value="socialOrFamilyPressure">Presión social o familiar</option>
                        <option value="other">Otros</option>
                    </select>
                    {errors.pregnancyCause && <span className="text-red-500">Este campo es requerido</span>}
                </div>
            </div>

            <div className="flex justify-center gap-3">
                <div className="flex flex-col">
                    <label htmlFor="otherCause">Otros (especificar)</label>
                    <input {...register("otherCause")} className="border p-2 rounded" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="socioeconomicLevel">Nivel socioeconómico del hogar</label>
                    <input {...register("socioeconomicLevel", { required: true })} className="border p-2 rounded" />
                    {errors.socioeconomicLevel && <span className="text-red-500">Este campo es requerido</span>}
                </div>
            </div>



            <div className="flex justify-center gap-3">
                <div className="flex flex-col">
                    <label htmlFor="department">Departamento</label>
                    <input {...register("department", { required: true })} className="border p-2 rounded" />
                    {errors.department && <span className="text-red-500">Este campo es requerido</span>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="area">Zona (rural/urbana)</label>
                    <select {...register("area", { required: true })} className="border p-2 rounded">
                        <option value="">Selecciona...</option>
                        <option value="rural">Rural</option>
                        <option value="urban">Urbana</option>
                    </select>
                    {errors.area && <span className="text-red-500">Este campo es requerido</span>}
                </div>
            </div>

            <div className="flex justify-center gap-3"> <div className="flex flex-col">
                <label htmlFor="accessToHealthServices">Acceso a servicios de salud y educación sexual</label>
                <select {...register("accessToHealthServices", { required: true })} className="border p-2 rounded">
                    <option value="">Selecciona...</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>
                {errors.accessToHealthServices && <span className="text-red-500">Este campo es requerido</span>}
            </div>

                <div className="flex flex-col">
                    <label htmlFor="locality">Localidad</label>
                    <input {...register("locality", { required: true })} className="border p-2 rounded" />
                    {errors.locality && <span className="text-red-500">Este campo es requerido</span>}
                </div>
            </div>

            <input type="submit" className="bg-blue-500 text-white p-2 rounded" value="Enviar" />
        </form>
    );
};

export default AdolescentDataForm;