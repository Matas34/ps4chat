/**
 * Handle the selection of an entity from the datalist
 * 
 * @param {datalist} options 
 * @param {React.FormEventHandler<FormControlElement>} event 
 * @param {onEntitySelected} responseMethod 
 */
export const handleSelection = (options, event, responseMethod) => {
    const selectedTitle = event.target.value;
        const selected = options.find(
            (option) => option.props.value === selectedTitle
        );

        if (selected) {
            responseMethod(selected.key);
        }
}