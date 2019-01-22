const bcrypt=require('bcrypt');
async function CallSalt()
{
    const salt=await bcrypt.genSalt(20)
    console.log(salt);
}
CallSalt();