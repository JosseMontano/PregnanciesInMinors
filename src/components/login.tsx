import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
    closeModal(): void
}

type LoginDTO = {
    username: string;
    password: string;
  };

  
const loginSchema = z.object({
    username: z.string().min(1, { message: "Nombre de usuario es requerido" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener minimo 8 caracteres" }),
  });

const Login = ({closeModal}: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginDTO>({
        resolver: zodResolver(loginSchema),
        //defaultValues:emptyPerson,
      });
    
      const onSubmit = (data: LoginDTO) => {
        console.log(data);
      };

  return (
    <div>
      <div className="absolute left-56 top-1">
        <button onClick={closeModal}>X</button>
      </div>
      <h2 className="text-center text-3xl">Iniciar sesion</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-5"
      >
        <div className="flex flex-col">
          <label htmlFor="">Nombre de usuario</label>
          <input
            {...register("username")}
            placeholder="Username"
            className="border p-2 rounded"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Contraseña</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <input
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          value="Iniciar sesion"
        />
      </form>
    </div>
  );
};

export default Login;
