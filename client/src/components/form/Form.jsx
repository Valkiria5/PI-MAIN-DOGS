import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDogs } from "../../redux/action/action";
import style from './from.module.css'

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperament = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  let [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image_url: "",
    temperament: [],
  });

  function handleInputChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (Object.values(errors).length === 0 && input.temperament.length !== 0) {
      dispatch(postDogs(input));
      alert("¡Dog successfully created!");
      navigate("/home");
    } else {
      alert(
        "All information about the new dog must be completed and valid, also you have to select a temperament"
      );
    }
  }
  

  function handleSelect(event) {
    if (input.temperament.length < 4) {
      setInput({
        ...input,
        temperament: [...input.temperament, event.target.value],
      });
      let temps = input.temperament;
      let findTemp = temps.indexOf(event.target.value);
      if (findTemp >= 0) {
        temps.splice(findTemp, 1);
      } else {
        temps.push(event.target.value);
      }
      setInput({
        ...input,
        temperament: temps,
      });
    } else {
      alert("You can only select 4 temperaments");
    }
  }

  function handleDeleteTemperaments(event) {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== event),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div >
      <div className={style.divformh1}>
        <h1 className={style.h1form}>CREATE YOUR OWN DOG</h1>
      </div>

      <div className={style.divform}>
        <div >
          <form  onSubmit={(event) => handleSubmit(event)}>
            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname}>Dog's Name </label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="name"
                value={input.name}
                required  
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.name && <p>{errors.name}</p>}
              </span>
            </div>

            <div className={style.labelminheightdiv}>
              <label className={style.labeldogsname}>Min. Height </label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="heightMin"
                value={input.heightMin}
                required
                className={style.inputdogsname}
              />
              <span span className={style.errorsdogsname}>
                {errors.heightMin && <p>{errors.heightMin}</p>}
              </span>
            </div>

            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname} >Max. Height -</label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="heightMax"
                value={input.heightMax}
                required
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.heightMax && <p>{errors.heightMax}</p>}
              </span>
            </div>

            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname}>Min. Weight -</label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="weightMin"
                value={input.weightMin}
                required
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.weightMin && <p>{errors.weightMin}</p>}
              </span>
            </div>

            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname}>Max. Weight -</label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="weightMax"
                value={input.weightMax}
                required
                className={style.inputdogsname}
              />
              <span  className={style.errorsdogsname}>
                {errors.weightMax && <p>{errors.weightMax}</p>}
              </span>
            </div>

            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname}> Life Span -</label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="life_span"
                value={input.life_span}
                required
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.life_span && <p>{errors.life_span}</p>}
              </span>
            </div>

            <div>
              <select className={style.temperamentform}
                onChange={(event) => handleSelect(event)} 
              >
                <option hidden >Temperaments</option>
                {temperament?.map((el) => (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
              <button type="submit" className={style.temperamentform}>
                CREATE A DOG
              </button>
            </div>
          </form>
          {input.temperament.map((el) => (
            <div key={el}>
              <button
                onClick={() => handleDeleteTemperaments(el)}
              >
                {el}
              </button>
            </div>
          ))}
          <div>
            <Link to="/home">
              <button className={style.temperamentform} >HOME</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(input.name)) {
    errors.name = "Name can only contain leters";
  }

  if (!input.heightMin) {
    errors.heightMin = "Minimun height is required";
  } else if (!/^([0-9])*$/.test(input.heightMin)) {
    errors.heightMin = "Minimun height should be a number";
  } else if (input.heightMin < 1 || input.heightMin > 50) {
    errors.heightMin = "Minimun height should be between 0 and 50 Cms";
  }

  if (!input.heightMax) {
    errors.heightMax = "Maximun height is required";
  } else if (!/^([0-9])*$/.test(input.heightMax)) {
    errors.heightMax = "Maximun height should be a number";
  } else if (input.heightMax > 100) {
    errors.heightMax = "Maximum height can't be more than 100 Cms";
  } else if (input.heightMax === input.heightMin) {
    errors.heightMax = "Maximun height can't be equal than minimun height";
  }

  if (!input.weightMin) {
    errors.weightMin = "Minimun weight is required";
  } else if (!/^([0-9])*$/.test(input.weightMin)) {
    errors.weightMin = "Minimun weight should be a number";
  } else if (input.weightMin < 1 || input.weightMin > 50) {
    errors.weightMin = "Minimun weight should be between 0 and 50 Kgs";
  }

  if (!input.weightMax) {
    errors.weightMax = "Maximun weight is required";
  } else if (!/^([0-9])*$/.test(input.weightMax)) {
    errors.weightMax = "Maximun weight should be a number";
  } else if (input.weightMax > 100) {
    errors.weightMax = "Maximum weight can't be more than 100 Kgs";
  } else if (input.weightMax === input.weightMin) {
    errors.weightMax = "Maximun weight can't be equal than minimun weight";
  }

  if (!input.life_span) {
    errors.life_span = "Life span is required";
  } else if (!/^([0-9])*$/.test(input.life_span)) {
    errors.life_span = "Dog's life span should be a number";
  }

  // if (!input.image_url) {
  //   input.image_url = "https://i.ytimg.com/vi/0oBx7Jg4m-o/maxresdefault.jpg";
  // } else if (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(input.image_url)) {
  //   errors.image_url = "The image_url should have a valid url";
  // }

  if (!input.temperament) {
    errors.temperament = "Temperemnts are required";
  }

  return errors;
}