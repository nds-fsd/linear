import cardStyles from "./card.module.css";
import { useForm } from "react-hook-form";
const Card = () => {
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const onSubmit = data => console.log(data);
  // console.log(watch("example"));

  const addFriend = (name) => {
    alert(`Añadir a ${name}`);
  };

  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.container1}>
        <span className={cardStyles.card_title}>Doing the Draf</span>
        <span className={cardStyles.card_image}>
          <img src="/src/assets/Vector.jpg" alt="flechita" />4
        </span>
      </div>
      <div className={cardStyles.tags}>
        <div>#UIXX</div>
        <div>Design</div>
        <div>Backlog</div>
      </div>
      <div className={cardStyles.container3}>
        <div className={cardStyles.avatar}>
          <img src="/src/assets/Avatar.png" alt="iconogente" />
          <img src="/src/assets/Avatar (1).png" alt="iconogente" />
          <img src="/src/assets/Other.png" alt="iconoplus" />
          <button
            className={cardStyles.button}
            onClick={() => addFriend("Rocio")}
          >
            +
          </button>
        </div>

        <div className={cardStyles.files}>
          {/* <input type="file" className={cardStyles.buttonadj}/> */}
          <img
            src="/src/assets/vector3.png"
            alt="file"
            className={cardStyles.clipAdd}
          />
          <span>2</span>
          <img
            className={cardStyles.iconomensaje}
            src="/src/assets/iconorange.png"
            alt="iconomensaje"
          />
          <span>3</span>
        </div>
      </div>
    </div>
  );
};
export default Card;
