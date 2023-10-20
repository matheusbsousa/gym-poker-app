type Rule = (name: string) => string | boolean

export function validate(value: string, rules: Rule[]) {
    for (let rule of rules) {
        const result = rule(value);

        if (typeof result === "string") {
            return result;
        }
    }

    return true;
}

export function required(value: string): string | boolean {
    const result = Boolean(value);

    if (!result) {
        return 'Value is required'
    }

    return true;
}

export function length({min, max}: { min: number, max: number }): Rule {
    return function (value: string): string | boolean {
        console.log(value)
        if (value.length > max || value.length < min) {
            return `Value should be between min (${min}) and max (${max})value`
        }

        return true
    }
}
