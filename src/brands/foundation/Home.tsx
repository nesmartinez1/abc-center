import BrandLanding from '../../components/BrandLanding'
import { brands } from '../../config/brands'

/** Foundation landing: features its two initiatives (MQA + Ocean Care). */
function FoundationHome() {
  return (
    <BrandLanding
      brand={brands.foundation}
      childBrands={[brands['mas-que-atletas'], brands['ocean-care']]}
    />
  )
}

export default FoundationHome
