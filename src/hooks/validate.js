function validate(values) {
    let errors = {};

    if (!values.name) {
        errors.name = 'Name is required';
    }

    if (!values.latitude) {
        errors.latitude = 'Latitude is required';
    } else if (isNaN(values.latitude)) {
        errors.latitude = 'Latitude must be a number';
    }

    if (!values.longitude) {
        errors.longitude = 'Longitude is required';
    } else if (isNaN(values.longitude)) {
        errors.longitude = 'Longitude must be a number';
    }

    return errors;
}

export default validate;