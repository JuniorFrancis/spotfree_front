class validations {
    
    email = () => {
        return [
            {
                type: 'email',
                message: 'Informe um e-mail válido',
            },
        ]
    }

    required = (message) => {
        return [
            {
                required: true,
                message: message,
            },
        ]
    }
}

export default new validations();