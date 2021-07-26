import hajjPackage1 from '../images/hajj-package-1.jpg'
import hajjPackage2 from '../images/hajj-package-2.jpg'
import hajjPackage3 from '../images/hajj-package-3.jpg'
import hajjPackage4 from '../images/hajj-package-4.jpg'
import hajjPackage5 from '../images/hajj-package-5.jpg'

import umrahPackage1 from '../images/umrah-package-1.jpg'
import umrahPackage2 from '../images/umrah-package-2.jpg'
import umrahPackage3 from '../images/umrah-package-3.jpg'
import umrahPackage4 from '../images/umrah-package-4.jpg'
import umrahPackage5 from '../images/umrah-package-5.jpg'

import tourPackage1 from '../images/tour-1.jpg'
import tourPackage2 from '../images/tour-2.jpg'
import tourPackage3 from '../images/tour-3.jpg'
import tourPackage4 from '../images/tour-4.jpg'
import tourPackage5 from '../images/tour-5.jpg'

const hajj = [hajjPackage1, hajjPackage2, hajjPackage3, hajjPackage4, hajjPackage5];
const umrah = [umrahPackage1, umrahPackage2, umrahPackage3, umrahPackage4, umrahPackage5];
const tour = [tourPackage1, tourPackage2, tourPackage3, tourPackage4, tourPackage5];

export function packageImage(packageType, index) {
    switch (packageType?.toLowerCase()) {
        case 'hajj':
            if (index < hajj.length) {
                return hajj[index]
            } else {
                return hajj[index % hajj.length]
            }
        case 'umrah':
            if (index < umrah.length) {
                return umrah[index]
            } else {
                return umrah[index % umrah.length]
            }
        case 'tour':
            if (index < tour.length) {
                return tour[index]
            } else {
                return tour[index % tour.length]
            }
        default:
            return hajj[0]
    }
}