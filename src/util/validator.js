let errors = [];

function ValidationContract() {
    errors = [];
}

ValidationContract.prototype.isRequired = function(value, message) {
    if (!value || value.length <= 0) {
        errors.push({
            message: message
        });
    }
};

ValidationContract.prototype.hasMinLen = function(value, min, message) {
    if (!value || value.length < min) {
        errors.push({
            message: message
        });
    }
};

ValidationContract.prototype.hasMaxLen = function(value, max, message) {
    if (!value || value.length > max) {
        errors.push({
            message: message
        });
    }
};

ValidationContract.prototype.isValid = function() {
    return errors.length === 0;
};

module.exports = ValidationContract;