import { ElNotification } from 'element-plus'
import { NotificationPosition, NotificationType } from './TipsEnum'

/**
 * # 悬浮出现在页面角落，显示全局的通知提醒消息。
 * @author Hdaes
 */
export class WetNotification {
    /**
    * # 标题
    */
    private title = '';

    /**
    * # 通知栏正文内容
    */
    private message = ''

    /**
    * # 显示时间, 单位为毫秒。
    */
    private duration = 2000

    /**
    * # 弹出位置
    */
    private position = NotificationPosition.TOPRIGHT

    constructor() {
      this.title = '系统提示'
      this.message = '你并没有传入具体的错误信息：）'
    }

    /**
     * # 设置标题
     * @param title 标题
     * @returns API
     */
    setTitle(title: string): this{
      this.title = title
      return this
    }

    /**
     * # 设置内容
     * @param message
     * @returns API
     */
    setMessage(message: string): this {
      this.message = message
      return this
    }

    /**
     * # 设置自动关闭时间
     * @param duration
     * @returns API
     */
    setDuration(duration: number):this{
      this.duration = duration
      return this
    }

    /**
     * # 成功通知
     * @param message [可选] 消息
     * @param title [可选] 标题
     * @returns
     */
    async success(message?: string, title?:string): Promise<boolean> {
      message ? this.setMessage(message) : null
      title ? this.setTitle(title) : null
      return this.show(NotificationType.SUCCESS)
    }

    /**
     * # 警告通知
     * @param message [可选] 消息
     * @param title [可选] 标题
     * @returns
     */
    async warning(message?: string, title?:string): Promise<boolean> {
      message ? this.setMessage(message) : null
      title ? this.setTitle(title) : null
      return this.show(NotificationType.WARNING)
    }

    /**
     * # 信息通知
     * @param message [可选] 消息
     * @param title [可选] 标题
     * @returns
     */
    async info(message?: string, title?:string): Promise<boolean> {
      message ? this.setMessage(message) : null
      title ? this.setTitle(title) : null
      return this.show(NotificationType.INFO)
    }

    /**
     * # 错误通知
     * @param message [可选] 消息
     * @param title [可选] 标题
     * @returns
     */
    async error(message?: string, title?:string): Promise<boolean> {
      message ? this.setMessage(message) : null
      title ? this.setTitle(title) : null
      return this.show(NotificationType.ERROR)
    }

    /**
     * # 显示通知方法
     * @param type NotificationType 通知类型
     * @returns Promise<boolean>
     */
    show(type: NotificationType):Promise<boolean> {
      return new Promise((resolve, reject) => {
        ElNotification({
          title: this.title,
          message: this.message,
          duration: this.duration,
          position: this.position,
          type,
          onClose: () => resolve(false),
          onClick: () => resolve(true),
        })
      })
    }
}
