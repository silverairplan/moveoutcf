export const checkemail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!reg.test(email))
    {
        return false;
    }
    else
    {
        return true;
    }
}