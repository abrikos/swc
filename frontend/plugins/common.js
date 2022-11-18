export default function ({app}, inject) {

    inject('copyToClipBoard', (spec) => {
        const textArea = document.createElement("textarea");
        spec.configurations.forEach(conf => {
            textArea.value += conf.chassis.partNumber + '\t'
                + conf.count + '\t'
                + conf.chassis.params + '\t'
                + conf.price + '\t'
                + conf.priceTotal
                + '\n';
        })
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
    })
}