export const validateName = (x: any) => {

    if (typeof x !== "string")
        throw new Error(`Invalid name type: ${typeof x}`)

    const name = x.trim();

    if (!name)
        throw new Error(`Empty name: ${name}`)

    if (name.length > 100)
        throw new Error(`Name too long: ${name}`);

    return name;
}