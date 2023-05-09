import newRegisterStyles from './newregister.module.css';
import { useRef } from 'react';



const NewRegister = () => {

  

        const formRef = useRef();
      
        function handleSubmit(evt) {
          evt.preventDefault();
          /*
              1. Usamos FormData para obtener la información
              2. FormData requiere la referencia del DOM,
                 gracias al REF API podemos pasar esa referencia
              3. Finalmente obtenemos los datos serializados
            */
          const formData = new FormData(formRef.current);
          const values = Object.fromEntries(formData);
      
          // Aquí puedes usar values para enviar la información
        }
      
        return (
          <div className={newRegisterStyles.generalcontainer}>
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className={newRegisterStyles.title}>
              <h1>Registrate</h1>
              <p>Es fácil y rápido.</p>
              </div>
              <div className={newRegisterStyles.form}>
                <div className={newRegisterStyles.userData}>
                    <input id="nombre" name="nombre" placeholder='Nombre' type="text"/>
                    <input id="apellidos" name="apellidos" placeholder='Apellidos' type="text"/>
                </div>
                <div className={newRegisterStyles.userDataLogin}>
                    <input id="email" name="email" placeholder='Correo electrónico' type="email"/>
                    <input id="password" name="password" placeholder='Contraseña nueva' type="password"/>
                </div>
                  <label htmlFor="birthday">Fecha de nacimiento</label>
                <div className={newRegisterStyles.userDate}>
                  <input id="date" name="date" type="date"/>
                </div>
                  <label htmlFor="genre">Pronombre</label>
                <div className={newRegisterStyles.userGender}>
                      <select>
                        <option>Sr</option>
                        <option>Sra</option>
                        <option>Neutro</option>
                      </select>
                </div>
              </div>
                <div className={newRegisterStyles.policy}>
                  <p>Es posible que usuarios de nuestro servicio hayan subido tu información de contacto a Maki.
                    <a href="#"> Más información.</a></p> 
                  <p>Al hacer clic en Registrarte, aceptas nuestras Condiciones. Obtén más información sobre cómo recogemos,
                  usamos y compartimos tu información en la Política de privacidad, así como el uso que hacemos de las cookies y 
                  tecnologías similares en nuestra Política de cookies.</p>
                </div>
                <div className={newRegisterStyles.register}>
                  <button id="apa" type="submit">Registrate</button>
                </div>
            </form>
          </div>
        );
      }

  export default NewRegister;