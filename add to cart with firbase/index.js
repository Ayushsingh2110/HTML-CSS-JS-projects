const formSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.inputField.value;
    console.log(inputValue);
}