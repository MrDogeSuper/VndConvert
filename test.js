var inputField = document.querySelector('input')  
inputField.oninput = function(){
            var removeChar = this.value.replace(/[^0-9\.]/g, '') // This is to remove alphabets and special characters.
            // console.log(removeChar);
            var removeDot = removeChar.replace(/\./g, '') // This is to remove "DOT"
            this.value = removeDot
    
            var formatedNumber = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            // console.log(formatedNumber);
            this.value = formatedNumber
            
        }