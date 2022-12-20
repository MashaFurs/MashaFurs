function HashStorageFunc(){
    let self=this; //Спасаем this

    let dataStorage= {}; //Создала приватный хэш

    self.addValue= function(key,value){ //Публичный метод
        dataStorage[key]=value;         //Добавила в хэш ключ и значение
    }

    self.getValue= function(key) {  //Публичный метод
        if(key in dataStorage) {
        return dataStorage[key];  //Если ключ есть в хэше,то вернет его значение.
            
        } else{
            return undefined;       
        }
    }

    self.deleteValue= function(key) {  //Публичный метод
        if( key in dataStorage) {
            delete dataStorage[key];  //Если ключ есть в хэше, то он удаляется и возвращается true
            return true;
               
        } else{
            return false;
        }
    }

    self.getKeys= function() {
        return Object.keys(dataStorage); // Использую статический метод класса Object, чтоб вернуть массив из ключей хэша
    }
}

let drinkStorage= new HashStorageFunc(); //Создала объект для хранения рецептов коктейлей


function inputInformation() {
    let coctailName= (prompt("Введите название коктейля")).toLowerCase();
    let alco= prompt("Коктейль алкогольный ?");
    let recipe= prompt("Введите рецепт приготовления коктейля");
    
    drinkStorage.addValue(coctailName,{alco,recipe});
    return;
}


function getInformation() {
    let coctailName= (prompt("Введите название коктейля")).toLowerCase();
    drinkStorage.getValue(coctailName);
    
    if(drinkStorage.getValue(coctailName) === undefined) {
        alert (`коктейль ${coctailName} отсутствует в хранилище`);
    } else{
        
        alert(`Напиток: ${coctailName}
Алкогольный: ${(drinkStorage.getValue(coctailName)).alco}
Рецепт приготовления: 
${(drinkStorage.getValue(coctailName)).recipe}`);
    }   
}


function inputDeleteCountry(){
    let coctailName= (prompt("Введите название коктейля, который хотите удалить?")).toLowerCase();
    
    if(drinkStorage.deleteValue(coctailName)==true) {
        alert (`Коктейль ${coctailName} удален из хранилища`);
    } else{
        alert(`Коктейль ${coctailName} отсутствует в хранилище`);
    }
}


function allCoctails() {
    alert(`Список всех коктейлей: ${drinkStorage.getKeys()}`);
}