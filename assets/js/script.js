const frm = document.querySelector('form')
const respAdianta = document.getElementById('outRespAdianta')
const respExtraCem = document.getElementById('outResp100')
const respExtraCinq = document.getElementById('outResp50')
const respDesc = document.getElementById('outRespDesc')
const respDescImposto = document.getElementById('outRespImposto')
const respDescFixos = document.getElementById('outRespDesc2')
const respFinal = document.getElementById('outRespSalario')

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

const calcExtra100 = (extra) =>{

    const extraTotal = calcHoras() * extra
    respExtraCem.innerText = `Extras 100%: R$ ${extraTotal.toFixed(2)}`
    return extraTotal
}

const calcExtra50 = (extra) =>{
    const extraTotal = calcHoras() * extra
    respExtraCinq.innerText = `Extras 50%: R$ ${extraTotal.toFixed(2)}`
    return extraTotal
}

const descInss = (salarioInteiro, extras100, extras50) =>{
    const total = salarioInteiro + extras100 + extras50

    if(total <= 1518){
        const descInss = total*(0.075)
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss

    }else if(total > 1518 || total <= 2793.88){
        const descInss = total*(0.09)-22.77
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss

    }else if(total > 2793.88 || total <= 4190.83){
        const descInss = total*(0.12)-106.59
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss

    }else if(total > 4190.83 || total <= 8157.41){
        const descInss = total*(0.14)-190.40
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss

    }else{
        const descInss = total*(0.14)-190.40
        respDesc.innerText = `Desconto de INSS R$: ${descInss.toFixed(2)}`
        return descInss
    }

}

const descIrrf = (salarioInteiro, extras100, extras50, inss) =>{

    const total = salarioInteiro + extras100 + extras50 - inss

    if(total <= 2259.20 ){
        respDescImposto.innerText = `Não possui desconto de Imposto de Renda.`
        return
    }else if (total >= 2259.21 && total <= 2826.65){
        const desconto = (total * 0.075)-182.16
        respDescImposto.innerText = `Desconto de IRRF: R$ ${desconto.toFixed(2)}`
        return desconto
    }else if (total >= 2826.66 && total <= 3751.05){
        const desconto = (total * 0.15)-394.16
        respDescImposto.innerText = `Desconto de IRRF: R$ ${desconto.toFixed(2)}`
        return desconto
    }else if (total >= 3751.06 && total <= 4664.68){
        const desconto = (total * 0.225)-675.49
        respDescImposto.innerText = `Desconto de IRRF: R$ ${desconto.toFixed(2)}`
        return desconto
    }else{
        const desconto = (total * 0.275)-908.73
        respDescImposto.innerText = `Desconto de IRRF: R$ ${desconto.toFixed(2)}`
        return desconto
}
}

const calcAdiantamento = () =>{
    const salario = salarioInt()
    const adiantamento = salario - (salario * 0.6)
    respAdianta.innerText = `Adiantamento dia 15: R$${adiantamento.toFixed(2)} \n(40% do seu salário bruto)`
    return adiantamento
}


const horasExtrasCem = () =>{

    const timeValue = frm.inExtraCem.value // Ex: "14:30"

    if(!timeValue){
        return 0
    }
        // Divide a string "HH:MM" em horas e minutos
        const partesDoTempo = timeValue.split(':');
        const horas = parseInt(partesDoTempo[0], 10); 
        const minutos = parseInt(partesDoTempo[1], 10); 
        // Calcula o total de minutos
        const totalMinutos = ((horas * 60) + minutos)*2;
        return totalMinutos/60

}

const horasExtrasCinq = () =>{

    const timeValue = frm.inExtraCinq.value 
    if(!timeValue){
        return 0
    }
        // Divide a string "HH:MM" em horas e minutos
        const partesDoTempo = timeValue.split(':');
        const horas = parseInt(partesDoTempo[0], 10); 
        const minutos = parseInt(partesDoTempo[1], 10); 
        // Calcula o total de minutos
        const totalMinutos = ((horas * 60) + minutos)*1.5;
        return totalMinutos/60

}

const descontosFixos = () =>{
        const valorFormatado = inDescontos.value;
        let valorLimpo = valorFormatado.replace(/\./g, '').replace(',', '');
        valorLimpo = valorLimpo.slice(0, -2);
        const numeroInteiro = Number(valorLimpo, 10); // Base 10 para evitar problemas
            if(numeroInteiro == undefined || numeroInteiro == 0 ){
                respDescFixos.innerText = `Descontos fixos: Não possui desconto fixo`
                return 0
            }else{
                respDescFixos.innerText = `Descontos fixos: R$${numeroInteiro.toFixed(2)}`
                return numeroInteiro
}
}

const pagamentoDia30 = (salarioInteiro, adiantamento, extras100, extra50, inss, irrf, fixos) =>{
            const salario = salarioInteiro - adiantamento

            const total = salario + extras100 + extra50 - inss - irrf - fixos

            respFinal.innerText = `Pagamento dia 30: R$${total.toFixed(2)} \n60% do seu salário + Extras - Descontos)`

            return total
}

frm.addEventListener('submit', e =>{
    e.preventDefault()

     if(salarioInt() == undefined || salarioInt() == 0 ){
        return
     }else{
        const salarioInteiro = salarioInt()
        const extras100 = calcExtra100(horasExtrasCem())
        const extras50 = calcExtra50(horasExtrasCinq())
        const inss = descInss(salarioInteiro, extras100, extras50)
        const irrf = descIrrf(salarioInteiro, extras100, extras50, inss)
        descInss(salarioInteiro, extras100, extras50)
        descIrrf(salarioInteiro, extras100, extras50, inss)
        calcExtra100(horasExtrasCem())
        calcExtra50(horasExtrasCinq())
        calcAdiantamento()
        descontosFixos()
        pagamentoDia30(salarioInteiro, calcAdiantamento(), extras100, extras50, inss, irrf, descontosFixos())
        
}
})



document.addEventListener('DOMContentLoaded', function() {
            const inputMonetario = document.getElementById('inSalario');
            const inputMonetario2 = document.getElementById('inDescontos')
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
            inputMonetario2.addEventListener('input', function(e) {
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
