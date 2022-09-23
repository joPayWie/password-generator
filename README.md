## Password generator
by **Jo Pay**

![password-generator](/assets/images/pass-gen-1.png)

### With this little web app you can get unlimited random and safe passwords to use in your registrations.

It uses the *Fisher-Yates algorithm* to guarantee 100% random passwords:

`const shuffleCharacters = (array) => { for (let i = array.length - 1; i > 0; i--) {let j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } return array }`

It includes *responsive design* for multiple devices (desktop, tablet and smartphones)

It works with 3 buttons:
1. *Generate*⚡ 
2. *Refresh*🔄 
3. *Copy to clipboard* 📑 

And also allows multiple password options:
- Different password length (**8**, **12** or **16** characters long)
- Different character types (**Letters**, **Numbers** and **Symbols**)
- Choose between **lowercase** or **UPPERCASE** letters


You can check the app deployment on the following link: [Password generator](https://jopaywie.github.io/password-generator/)   

## Thank you for reading &#128156;