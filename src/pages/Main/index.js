import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './styles.css';

function App() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  let currentCep = watch('cep', '');

  useEffect(() => {
    async function handleCompletedByCepAddress(cepInput) {
      if (cepInput.length >= 8) {
        try {
          const result = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
          const { logradouro, bairro, localidade, uf, } = await result.json();

          setValue('logradouro', logradouro);
          setValue('bairro', bairro);
          setValue('cidade', localidade);
          setValue('estado', uf);
          setValue('pais', "Brasil");
        } catch (error) {
          console.log("Test");
        }
      }
    }

    handleCompletedByCepAddress(currentCep);
  }, [currentCep]);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-columns">
          <div className="container-inputs">
            <input placeholder="Nome" {...register('name', { required: true })} />
            <input placeholder="CEP" {...register('cep', { required: true })} />
            <input placeholder="Logradouro" {...register('logradouro')} />
            <input placeholder="Número" {...register('number', { required: true })} />
          </div>
          <div className="container-inputs">
            <input placeholder="Bairro" {...register('bairro')} />
            <input placeholder="Cidade" {...register('cidade')} />
            <input placeholder="Estado" {...register('estado')} />
            <input placeholder="País" {...register('pais')} />
          </div>
        </div>
        <div className="container-inputs">
          {errors.name && <p>Last name is required.</p>}
          {errors.number && <p>Last name is required.</p>}
        </div>
        <div>
          <button className="btn-green" type="submit">Cadastrar</button>
          <button onClick={() => reset()} className="btn-red" type="submit">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default App;
