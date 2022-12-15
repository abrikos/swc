export default function ({app}, inject) {

    inject('components', (configuration, components, tab) => {
        const componentsByType = tab.type ?
            components.filter(c => c.type === tab.type)
            :
            components.filter(c => c.category === tab.category)
        console.log(JSON.stringify(tab))
        return componentsByType
            .filter(c => !c.deleted)
            .filter(c => {
                if (c.unitFix && (c.unitFix !== configuration.chassis.units)) return
                if (c.unitMin && (c.unitMin > configuration.chassis.units)) return
                if (!c.platforms.includes(configuration.chassis.platform)) return
                switch (tab.category) {
                    case 'CPU':
                        return configuration.chassis.cpu === c.type && c.platforms.includes(configuration.chassis.platform)
                    case 'Power':
                        if (c.partNumber === 'PSU065R' && configuration.chassis.platform !== 'G2R') return false
                        if (configuration.gpuCount >= 0) return c.power >= 1300
                        if (configuration.gpuCount >= 1) return c.power >= 1600
                    case 'Storage':
                        if (configuration.chassis.partNumber === 'QSRV-2524') return c.isSAS && c.isSFF
                        if (configuration.chassis.partNumber === 'QSRV-4524') return c.isSAS && (c.isSFF || c.isLFF)
                        if (configuration.chassis.isSFF && c.type === 'HDD') return c.isSFF
                    case 'Riser':
                        if (configuration.chassis.units < c.riserUnit) return false
                }
                switch (tab.type) {
                    case 'GPU':
                    //if(configuration.chassis.units === 1 && !['GFGT730', 'QUADROP620', 'TESLAT416'].includes(c.partNumber)) return false
                    case 'Rear bay':
                        if (configuration.chassis.units === 1) return
                        if (configuration.isRearBayNeeded) {
                            return c.partNumber === 'rbaySFFU2'
                        }
                }
                return true
            }).map(c => {
                if (configuration.cpuCount && c.category === 'CPU') {
                    c.countDisabled = true
                }
                if (configuration.gpuCount && c.type === 'GPU') {
                    c.countDisabled = true
                }
                if (configuration.memCount && c.category === 'Memory') {
                    c.countDisabled = true
                }
                if (configuration.powerCount && c.category === 'Power') {
                    c.countDisabled = true
                }
                if (configuration.ocpCount && c.type === 'LAN OCP 3.0') {
                    c.countDisabled = true
                }
                return c
            })
    })

    inject('validator', (configuration) => {
        const result = {
            errors: [],
        };

        if (!configuration.cpuCount && configuration.memCount) {
            result.errors.push(`Необходимо выбрать CPU`)
        }
        //MEMORY
        if (configuration.memCount > configuration.memMaxCount) {
            result.errors.push(`Выбранное количество модулей памяти (${configuration.memCount}) превышает максимальное (${configuration.memMaxCount})`)
        } else if ((configuration.cpuCount || configuration.memCount) && configuration.cpuCount < 2 && configuration.memCount > (configuration.chassis.platform === 'G3' ? 16 : 12)) {
            result.errors.push(`Для выбранного количества модулей памяти (${configuration.memCount}) недостаточно процессоров (${configuration.cpuCount})`)
        }

        //GPU
        if (configuration.gpuCount === 1 && configuration.power < 1300) {
            result.errors.push(`При установке 1 GPU необходимо питание не менее 1300W. Текущее: ${configuration.power}`)
        }
        if (configuration.gpuCount > 1 && configuration.power < 1600) {
            result.errors.push(`При установке 2 и более GPU необходимо питание не менее 1600W. Текущее: ${configuration.power}`)
        }

        //REAR BAY
        //configuration.chassis.units * 2 + 1 - configuration.riserCount
        if (configuration.rearBayCount > 4) {
            result.errors.push(`Превышено количество rear bay: ${configuration.rearBayCount}`)
        }
        if (configuration.rearBaySFFCount > 2) {
            result.errors.push(`Превышено количество SFF rear bay: ${configuration.rearBaySFFCount}`)
        }
        if (configuration.rearBayLFFCount > 2) {
            result.errors.push(`Превышено количество SFF rear bay: ${configuration.rearBayLFFCount}`)
        }


        //RISER
        const needed = configuration.gpuCount + configuration.lanCount100 - configuration.riserX16Count
        if (needed > 0) {
            result.errors.push(`Сумма LAN 100GbE и GPU не может быть более 2х`)
        }
        const limit = configuration.chassis.units === 1 ? 1 : 2
        if ((configuration.cpuCount < limit) && configuration.riserCount >= limit) {
            result.errors.push(`Для выбранного количество райзеров (${configuration.riserCount}) недостаточно процессоров (${configuration.cpuCount})`)
        }
        if (configuration.riserCount > configuration.chassis.units * 2) {
            result.errors.push(`Райзеров нельзя установить более ${configuration.chassis.units * 2} шт`)
        }
        if (configuration.riserCount + configuration.rearBayCount > 4) {
            result.errors.push(`Сумма райзеров (${configuration.riserCount}) и корзин (${configuration.rearBayCount}) не может быть более 4`)
        }
/*
        if (!configuration.riserCount && configuration.hbaCount) {
            result.errors.push(`Не хватает слотов на райзере`)
        }
*/
        if (configuration.raidCount > configuration.riserCount) {
            result.errors.push(`Не хватает слотов на райзере`)
        }
        if (configuration.riserMaxCount < configuration.riserCount) {
            result.errors.push(`Количество выбранных райзеров (${configuration.riserCount}) больше чем возможно установить (${configuration.riserMaxCount})`)
        }
        if (configuration.riserPort12Count > 2) {
            result.errors.push(`Количество выбранных райзеров port 1/2 (${configuration.riserPort12Count}) не может быть более 2х`)
        }
        console.log('RISER',configuration.riserPort3Count)
        if (configuration.riserPort3Count > 1) {
            result.errors.push(`Количество выбранных райзеров port 3 (${configuration.riserPort12Count}) не может быть более 1`)
        }
        if (configuration.riserPort4Count > 1) {
            result.errors.push(`Количество выбранных райзеров port 4 (${configuration.riserPort12Count}) не может быть более 1`)
        }


        //PCI-E
        if (configuration.pcieCount > configuration.pcieMaxCount) {
            result.errors.push(`Недостаточно PCI-E слотов (${configuration.pcieMaxCount}) для выбранного количества PCI-E устройств: ${configuration.pcieCount}`)
        }
        if (configuration.lanPortsCount < configuration.transceiverCount) {
            result.errors.push(`Количество SFP модулей и DAC кабелей больше чем портов на сетевых картах`)
        }

        //STORAGE
        console.log(configuration.diskCount, configuration.chassis.disks)
        if (configuration.diskCount > configuration.chassis.disks)
            result.errors.push(`Установлено дисков (${configuration.diskCount}) более чем позволяют возможности платформы (${configuration.chassis.disks})`)
        if (!configuration.fcCount && !configuration.raidCount && configuration.diskCount > 12) {
            result.errors.push(`Для платформы сколичеством дисков более 12 необходим RAID или HBA`)
        }
        if (configuration.isRearBayNeeded) {
            result.errors.push(`Для выбранных SSD U.2 NVMe (${configuration.nvmeCount})  необходимо ${configuration.rearBaysNeeded} Rear bay PN rbaySFFU2 (${configuration.rearBayCount})`)
        }
        /*if (configuration.raid93Count && !configuration.cacheModule93Count) {
            result.errors.push(`93хх серия RAID совместима только с Модуль защиты кэша для RAID 93xx (PN CVM02)`)
        }*/
        if (!configuration.raid93Count && configuration.cacheModule93Count) {
            result.errors.push(`Некуда поставить модуль защиты, выберите RAID`)
        }
        if (!configuration.raid94Count && configuration.cacheModule94Count) {
            result.errors.push(`Некуда поставить модуль защиты, выберите RAID`)
        }
        if (configuration.cacheModuleCount > configuration.raidCount) {
            result.errors.push(`Количество модулей защиты (${configuration.cacheModuleCount}) не больше количества RAID (${configuration.raidCount}) может быть`)
        }
        /*if (configuration.raid94Count && !configuration.cacheModule94Count) {
            result.errors.push(`94хх-95xx серия RAID совместима только с Модуль защиты кэша для RAID 94xx-955xx (PN CVPM05)`)
        }*/
        if ((configuration.raid94Count + configuration.raid93Count) && configuration.raidTrimodeCount) {
            result.errors.push(`RAID контроллер Trimode 9440 Raid 8i (1,0,10,5,6,50,60) (PN 94008IR) не совместим с модулями защиты. Модули защиты к нему добавлять не нельзя`)
        }
        if (configuration.ssdU2Count > configuration.rearBayU2Count * 2) {
            result.errors.push(`На каждые 2 шт SSD U.2 NVMe (${configuration.ssdU2Count}) необходим rear bay rbaySFFU2 (${configuration.rearBayCount})`)
        }


        //G2R
        if (configuration.chassis.platform === 'GR2') {
            if (configuration.cable4U2Count < configuration.ssdU2Count) {
                result.errors.push(`С каждым диском U.2 NVMe (${configuration.ssdU2Count}) должен быть добавлен кабель (PN 1*SFF-8643 - 1*SFF-8643) (${configuration.cable4U2Count})`)
            }
            if (configuration.cable4U2Count < configuration.ssdU2Count) {
                result.errors.push(`С каждым диском U.2 NVMe (${configuration.ssdU2Count}) должен быть добавлен кабель (PN 1*SFF-8643 - 1*SFF-8643) (${configuration.cable4U2Count})`)
            }
            if (['QSRV-261202R_Active_BP_wth_4_U2', 'QSRV-262402R_active_BP_wth_4_U2']
                .map(c => c.toLowerCase())
                .includes(configuration.chassis.partNumber.toLowerCase())) {
                if (configuration.ssdU2Count > 4)
                    result.errors.push(`Превышено допустимое (4) количество SSD U.2 NVMe ${configuration.ssdU2Count}`)
                if (!configuration.raidTrimodeCount)
                    result.errors.push(`Необходимо подключение контроллера Trimode`)
                if (configuration.cable8643Count < 5) {
                    result.errors.push(`Необходимы кабели для подключения 8643 на 8643 ${5 - configuration.cable8643Count} штук`)
                }
            }
            if (['QSRV-361602R_Active_BP', 'QSRV-463602R_Active_BP', 'QSRV-261202R_Active_BP', 'QSRV-262402R_active_BP']
                .map(c => c.toLowerCase())
                .includes(configuration.chassis.partNumber.toLowerCase())
            ) {
                if (!!configuration.sasCount)
                    result.errors.push(`Необходимо подключение контроллера SAS HBA или SAS RAID`)
                const maxCount = 'QSRV-463602R' === configuration.chassis.partnumber ? 4 : 2
                if (configuration.cable8643Count < maxCount) {
                    result.errors.push(`Необходимы кабели для подключения 8643 на 8643 ${maxCount - configuration.cable8643Count} штук`)
                }
            }
            if (['QSRV-261202R', 'QSRV-260802R', 'QSRV-160402R', 'QSRV-160404R', 'QSRV-160802R', 'QSRV-160804R']
                .map(c => c.toLowerCase())
                .includes(configuration.chassis.partNumber.toLowerCase())
            ) {
                if (configuration.diskCount > configuration.cableSataCount)
                    result.errors.push(`Необходимы кабели SATA-SATA (${configuration.diskCount - configuration.cableSataCount})`)
                if (configuration.raidCount * 4 > configuration.cable8643Count) {
                    result.errors.push(`Необходимы кабели для подключения 8643 на 8643 ${configuration.raidCount * 4 - configuration.cable8643Count} штук`)
                }
            }
        }

        return result
    })

    inject('componentCount', (configuration, tab) => {
        switch (tab.category) {
            case 'CPU':
                return [0, 1, 2]
            /*const modules = configuration.memCount;
            if (!modules) return [0, 1, 2]
            if (configuration.chassis.platform === 'G3') {
                return modules > 16 ? [0, 2] : [0, 1, 2]
            } else {
                return modules > 12 ? [0, 2] : [0, 1, 2]
            }*/
            case 'Memory':
                return Array.from(Array(configuration.memMaxCount + 2).keys()).filter(i => !(i % 2))
            case 'Riser':
                return [0,1,2]
                //if(configuration.riserMaxCount <= 0) return [0]
                // return Array.from(Array(configuration.risersAvailable + 1).keys());
            case 'Power':
                return [0, 1]
        }
        switch (tab.type) {
            case 'GPU':
                return [0, 1, 2]
            case 'SSD m.2':
                return [0, 1, 2]
            case 'Rear bay':
                return [0, 1, 2]
            //return [0, 1, 2]
            case 'LAN OCP 3.0':
                return [0, 1]
            case 'SSD U.2 NVMe':
                const trimode8Adds = configuration.raidTrimode8iCount * 2
                const trimode16Adds = configuration.raidTrimode16iCount * 4
                //return Array.from(Array(5 + trimode8Adds + trimode16Adds).keys());
                return Array.from(Array(5).keys());
            case 'HDD':
            case 'SSD 2.5':
                return Array.from(Array(configuration.chassis.disks + 1).keys());
        }
        return [0, 1, 2, 3, 4, 5]
    })

}