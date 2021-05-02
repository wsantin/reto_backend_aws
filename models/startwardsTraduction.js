const  modelPersonTraduction = (data) => {
    const personModel={
      "name": "nombre",
      "height": "altura",
      "mass": "masa",
      "hair_color": "color_cabello",
      "skin_color": "color_piel",
      "eye_color": "color_ojos",
      "birth_year": "anio_nacimiento",
      "gender": "genero",
      "homeworld": "mundo_natal",
      "films": "peliculas",
      "species": "especies",
      "vehicles": "vehiculos",
      "starships": "naves_estelares",
      "created": "creado",
      "edited": "editado",
      "url": "url"
    };
  
    const new_person= {};
    
    Object.keys(data).map(function(key1){
      const value = data[key1];
  
      //Recorre Modelo de traduccion
      Object.keys(personModel).map(function(key2){
        const value2 = personModel[key1];
        if(key1 === key2){
          new_person[value2]= value;
        }
      });
  
    });
    return new_person;
};

export default modelPersonTraduction;
