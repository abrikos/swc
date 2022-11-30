export default function ({app}, inject) {

    inject('components', (configuration, components, tab) => {
        let gpus = 0;
        for (const part of configuration.parts) {
            if (part.component.type === 'GPU') {
                gpus += part.count
            }
        }
        const componentsByType = tab.type ?
            components.filter(c => c.type === tab.type)
            :
            components.filter(c => c.category === tab.category)

        return componentsByType.filter(c => {
            switch (tab.category) {
                case 'CPU':
                    return configuration.chassis.cpu === c.type && c.platforms.includes(configuration.chassis.platform)
                case 'Power':
                    if (c.partNumber === 'PSU065R' && configuration.chassis.platform !== 'G2R') return false
                    if (gpus > 0) return c.power >= 1300
                    if (gpus > 1) return c.power >= 1600
                case 'Storage':
                    if (configuration.chassis.isSFF && c.type === 'HDD') return c.isSFF
                default:
                    return true
            }
        })
    })

    inject('validator', (configuration) => {
        return validator(configuration)
    })

    function validator(configuration) {
        const result = {
            errors: [],
        };
        if (!configuration.cpuCount && configuration.memCount) {
            result.errors.push(`Необходимо выбрать CPU`)
        }
        if ((configuration.cpuCount || configuration.memCount) && configuration.cpuCount < 2 && configuration.memCount > (configuration.chassis.platform === 'G3' ? 16 : 12)) {
            result.errors.push(`Для выбранного количества модулей памяти (${configuration.memCount}) недостаточно процессоров (${configuration.cpuCount})`)
        }
        if (configuration.gpuCount && !configuration.lanCount && !configuration.riserX16Count) {
            result.errors.push(`При выборе GPU необходим Riser x16`)
        }
        if (!configuration.gpuCount && configuration.lanCount && !configuration.riserX16Count) {
            result.errors.push(`При выборе LAN необходим Riser x16`)
        }
        if (configuration.gpuCount && configuration.lanCount && configuration.riserX16Count < configuration.gpuCount + configuration.lanCount) {
            result.errors.push(`При выборе LAN и GPU необходимо ${configuration.gpuCount + configuration.lanCount} Riser x16.`)
        }
        if (configuration.gpuCount === 1 && configuration.power < 1300) {
            result.errors.push(`При установке 1 GPU необходимо питанее не менее 1300W. Текущее: ${configuration.power}`)
        }
        if (configuration.gpuCount > 1 && configuration.power < 1600) {
            result.errors.push(`При установке 2 и более GPU необходимо питанее не менее 1600W. Текущее: ${configuration.power}`)
        }
        if (!configuration.fcCount && !configuration.raidCount && configuration.diskCount > 12) {
            result.errors.push(`Для платформы сколичеством дисков более 12 необходим RAID или HBA`)
        }
        if (configuration.cpuCount < 2 && configuration.riserCount) {
            const cpuNeeded = Math.ceil(configuration.riserCount / configuration.chassis.units)
            result.errors.push(`Для выбранного количество райзеров (${configuration.riserCount}) недостаточно процессоров. Минимум: ${cpuNeeded}`)
        }
        if (configuration.pcieCount > configuration.pcieSlotAvailable) {
            result.errors.push(`Недостаточно PCI-E слотов (${configuration.pcieSlotAvailable}) для выбранного количества PCI-E устройств: ${configuration.pcieCount}`)
        }
        if (configuration.riserAvailable < 0) {
            result.errors.push(`ОШИБКА В КОЛИЧЕСТВЕ (select): райзеров установлено больше чем возможно ${configuration.riserCount}`)
        }

        const rearBaysNeeded = [0, 0, 1, 2, 2];
        if (configuration.rearBayCount < rearBaysNeeded[configuration.nvmeCount]) {
            result.errors.push(`Для выбранных SSD U.2 NVMe (${configuration.nvmeCount})  необходимо ${rearBaysNeeded[configuration.nvmeCount]} Rear bay (${configuration.rearBayCount})`)
        }

        return result
    }

    inject('componentCount', (configuration, tab) => {
        switch (tab.category) {
            case 'CPU':
                const modules = configuration.memCount;
                if (!modules) return [0, 1, 2]
                if (configuration.chassis.platform === 'G3') {
                    return modules > 16 ? [0, 2] : [0, 1, 2]
                } else {
                    return modules > 12 ? [0, 2] : [0, 1, 2]
                }
            case 'Memory':
                return configuration.chassis.platform === 'G3' ?
                    [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32] :
                    [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            /*const memCount = configuration.parts.filter(p => p.component.category === 'CPU').reduce((a, b) => a + b.count, 0);
            if (configuration.chassis.platform === 'G3') {
                return memCount === 1 ? [0, 2, 4, 6, 8, 10, 12, 14, 16] : [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
            } else {
                return memCount === 1 ? [0, 2, 4, 6, 8, 10, 12] : [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }*/
            case 'Riser':
                return Array.from(Array(configuration.chassis.units * 2 + 1 - configuration.rearBayCount).keys());
            case 'Power':
                return [0, 1]
        }
        switch (tab.type) {
            case 'GPU':
                return [0, 1, 2]
            case 'SSD m.2':
                return [0, 1, 2]
            case 'Rear bay':
                return Array.from(Array(configuration.chassis.units * 2 + 1 - configuration.riserCount).keys());
                //return [0, 1, 2]
            case 'LAN OCP 3.0':
                return [0, 1]
            case 'SSD U.2 NVMe':
                return [0, 1, 2, 3, 4]
            case 'HDD':
            case 'SSD 2.5':
                return Array.from(Array(configuration.chassis.discs + 1).keys());
        }
        return [0, 1, 2, 3, 4, 5]
    })

}