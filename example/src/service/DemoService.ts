import { ClassName } from '@/decorator/CustomName'
import { BaseAbstractService } from '../base/BaseAbstractService'

export default class DemoService extends BaseAbstractService {
    baseUrl = '/hades'

    getDemoData(): Promise<any> {
      return this.api('section').send()
    }
}
