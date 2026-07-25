import BrandLanding from '../../components/BrandLanding'
import { brands } from '../../config/brands'

/** Umbrella home: showcases the three top-level programs of the Center. */
function CentroHome() {
  return (
    <BrandLanding
      brand={brands.centro}
      childBrands={[
        brands['brilliant-brains'],
        brands['mental-care'],
        brands.foundation,
      ]}
    />
  )
}

export default CentroHome
