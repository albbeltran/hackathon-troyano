function onlyNumbers(e){
    key=e.keyCode || e.which;
    keyboard = String.fromCharCode(key);
    number = "0123456789";
    special = "8-37-38-46"; //array
    keyboard_special = false;

    for(let i in special){
        if(key==special[i]){
            keyboard_special = true;
        }
    }

    if(number.indexOf(keyboard)==-1 && !keyboard_special){
        return false;
    }
}