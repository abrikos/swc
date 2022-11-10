export default function ({app}, inject) {

    inject('components', (configuration, components, tab, subTab) => {
        let gpus = 0;
        for (const part of configuration.parts) {
            if (part.component.type === 'GPU') {
                gpus += part.count
            }
        }
        const componentsByType = subTab ?
            components.filter(c => c.type === subTab)
            :
            components.filter(c => c.category === tab)
        return componentsByType.filter(c => {
            switch (tab) {
                case 'CPU':
                    return configuration.chassis.cpu === c.type
                case 'Power':
                    if(gpus>0) return c.power >= 1300
                    if(gpus>1) return c.power >= 1600
                case 'Storage':
                    if(configuration.chassis.isSFF && c.type === 'HDD') return c.isSFF
                default:
                    return true
            }
        })
    })


    inject('componentCount', (configuration, tab, subTab) => {
        if (tab === 'CPU') {
            const memoryModulesAttached = configuration.parts.filter(p => p.component.category === 'Memory').reduce((a, b) => a + b.count, 0);
            return configuration.chassis.platform === 'G3' ?
                memoryModulesAttached === 0 || memoryModulesAttached > 16 ? [0, 1, 2] : [0, 1]
                :
                memoryModulesAttached === 0 || memoryModulesAttached > 12 ? [0, 1, 2] : [0, 1]
        } else if (tab === 'Memory') {
            if (configuration.chassis.platform === 'G3') {
                return configuration.parts.filter(p => p.component.category === 'CPU').length === 1 ? [0, 2, 4, 6, 8, 10, 12, 14, 16] : [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
            } else {
                return configuration.parts.filter(p => p.component.category === 'CPU').length === 1 ? [0, 2, 4, 6, 8, 10, 12] : [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        } else if (subTab === 'GPU') {
            return [0, 1, 2]
        }
        return [0, 1, 2, 3, 4, 5]
    })
}