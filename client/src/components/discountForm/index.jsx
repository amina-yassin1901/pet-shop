import styles from "./styles.module.css";
import discountImg from "../../assets/img/discountForm.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../contacts/api";
import { useState } from "react";
function DiscountForm() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/sale/send`, data);
      reset();
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.title}>5% off on the first order</h3>
        <div className={styles.formBox}>
          <img className={styles.img} src={discountImg} />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input
              className={styles.input}
              type="text"
              placeholder="Name"
              {...register("name", { required: "Enter your name" })}
            />
            {errors.name && <p>{errors.name.message}</p>}

            <input
              className={styles.input}
              type="tel"
              placeholder="Phone number"
              {...register("phone", {
                required: "Enter your phone",
              })}
            />
            {errors.phone && <p>{errors.phone.message}</p>}

            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Enter your email",
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <button className={styles.btn} type="submit">
              {success ? "Request Submitted" : "Get a discount"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default DiscountForm;
