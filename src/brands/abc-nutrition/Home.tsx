import BrandLanding from '../../components/BrandLanding'
import { brands } from '../../config/brands'

/**
 * ABC Nutrition — announced by ABC as a Foundation initiative that is "coming
 * soon". Nothing beyond the name has been provided, so this uses the generic
 * BrandLanding prototype template with placeholder copy from the brand config.
 */
function AbcNutritionHome() {
  return <BrandLanding brand={brands['abc-nutrition']} />
}

export default AbcNutritionHome
