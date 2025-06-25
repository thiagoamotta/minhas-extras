const frm = document.querySelector('form')
const respAdianta = document.getElementById('outRespAdianta')
const respExtraCem = document.getElementById('outResp100')
const respExtraCinq = document.getElementById('outResp50')
const respDesc = document.getElementById('outRespDesc')
const respFinal = document.getElementById('outRespSalario')

document.addEventListener('DOMContentLoaded', function() {
            const inputMonetario = document.getElementById('inSalario');

            inputMonetario.addEventListener('input', function(e) {
                let valor = e.target.value;

                // 1. Remove tudo que não é dígito (0-9)
                valor = valor.replace(/\D/g, '');

                // Se o valor estiver vazio, não faz nada
                if (valor === '') {
                    e.target.value = '';
                    return;
                }

                // 3. Divide a string para inserir a vírgula dos centavos
                const centavos = valor.slice(-2);
                const reais = valor.slice(0, -2);

                // 4. Formata os reais com pontos a cada três dígitos
                let reaisFormatados = '';
                for (let i = reais.length - 1, count = 0; i >= 0; i--, count++) {
                    reaisFormatados = reais[i] + reaisFormatados;
                    if (count % 3 === 2 && i !== 0) {
                        reaisFormatados = '.' + reaisFormatados;
                    }
                }

                // 5. Junta tudo com a vírgula
                e.target.value = reaisFormatados + ',' + centavos;
            });

            
        });

const salarioInt = () =>{
        
        const valorFormatado = inSalario.value;
        let valorLimpo = valorFormatado.replace(/\./g, '').replace(',', '');
        valorLimpo = valorLimpo.slice(0, -2);
        const numeroInteiro = Number(valorLimpo, 10); // Base 10 para evitar problemas
            if(numeroInteiro == undefined || numeroInteiro == 0 ){
            alert('Digite um sálario válido!')
                return
            }else{
                return numeroInteiro
        
}}


const calcHoras = () =>{
    const salario = salarioInt()
    const horasMes = 199
    const valorHoraTrabalhada = salario/horasMes
    return valorHoraTrabalhada
    
}

const salarioPagamento = () =>{
    const salario = salarioInt()
        const salarioPagamento = salario - (salario * 0.4)
        return salarioPagamento
    
}

const calcAdiantamento = () =>{
    const salario = salarioInt()
    const adiantamento = salario - (salario * 0.6)
    respAdianta.innerText = `Adiantamento dia 15: R$${adiantamento.toFixed(2)} \n (40% do seu salário bruto)`
    return adiantamento
}

const somaExtra = (extra100, extra50) =>{
    const extraCem = extra100*(calcHoras()*2)
    const extraCinq = extra50*(calcHoras()+(calcHoras()*0.5))
    respExtraCem.innerText = `Total extra 100% R$: ${extraCem.toFixed(2)}`
    respExtraCinq.innerText = `Total extra 50% R$: ${extraCinq.toFixed(2)}`
    const total = extraCem + extraCinq
    return total
}


const descontoInss = (salarioTotal) =>{
    
    if(salarioTotal <= 1518){
        const descInss = salarioTotal*(0.075)
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss

    }else if(salarioTotal > 1518 || salarioTotal <= 2793.88){
        const descInss = salarioTotal*(0.09)
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss

    }else if(salarioTotal > 2793.88 || salarioTotal <= 4190.83){
        const descInss = salarioTotal*(0.12)
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss

    }else if(salarioTotal > 4190.83 || salarioTotal <= 8157.41){
        const descInss = salarioTotal*(0.14)
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss

    }else{
        const descInss = salarioTotal*(0.14)
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss
    }
    
    
}

const salarioComExtras = () =>{
        const extraCem = Number(frm.inExtraCem.value)
        const extraCinq = Number(frm.inExtraCinq.value)
        const salarioComExtra = salarioPagamento()

        if(extraCem == 0 && extraCinq == 0 ){
            const confirma = confirm('Deseja somente verificar pagamento sem extra? ')
            if(confirma){
                respFinal.innerText = `Pagamento dia 30: R$${(salarioComExtra-descontoInss(salarioComExtra)).toFixed(2)} \n (60% do seu salário + Extras + Descontos)`
                alert('Lembrando que os valores calculados são aproximados!\nSeriam necessários Dias, Horas e Minutos exatos\nTrabalhados para um Cálculo Preciso!...')
                return salarioComExtra
            }else{
                return
            }
        }else{
            const salarioComExtra = salarioPagamento()+somaExtra(extraCem, extraCinq)
                respFinal.innerText = `Pagamento dia 30: R$${(salarioComExtra-descontoInss(salarioComExtra)).toFixed(2)} \n (60% do seu salário + Extras + Descontos)`
                alert('Lembrando que os valores calculados são aproximados!\nSeriam necessários Dias, Horas e Minutos exatos\nTrabalhados para um Cálculo Preciso!...')
                return salarioComExtra
        }
        
}



frm.addEventListener('submit', e =>{
    e.preventDefault()

     if(salarioInt() == undefined || salarioInt() == 0 ){
        return
     }else{
        salarioComExtras()
        calcAdiantamento()
}
})







