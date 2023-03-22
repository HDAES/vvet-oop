/**
 * # 😄 控制台输出助手
 * @author Hdaes
 */
export class ConsoleHelper {
  /**
     * # 😄控制台显示分组调试信息
     * @param title 分组标题
     */
  static title(title: string): void {
    const content = `%c${title}`
    const css = 'font-size:14px;color:#333333;font-weight:bold;'
    this.show(content, css)
  }

  /**
     * # 😄成功输出
     * @param message
     */
  static success(message: string): void {
    const content = `%cSUCCESS\t\t${message}`
    const css = 'color:darkgreen;'
    this.show(content, css)
  }

  /**
     * # 😄警告输出
     * @param message
     */
  static warning(message: string): void {
    const content = `%cWARNING\t\t${message}`
    const css = 'color:orange;'
    this.show(content, css)
  }

  /**
     * # 😄错误输出
     * @param message
     */
  static error(message: string): void {
    const content = `%cERROR\t\t${message}`
    const css = 'color:red;'
    this.show(content, css)
  }

  /**
     * # 😄信息输出
     * @param message
     */
  static info(message: string): void {
    const content = `%cINFO\t\t${message}`
    const css = 'color:#333;'
    this.show(content, css)
  }

  /**
     * # 😄普通输出
     * @param message
     */
  static log(message: string): void {
    const content = `%cLOG\t\t\t${message}`
    const css = 'color:#aaa;'
    this.show(content, css)
  }

  /**
     * # 😄输出
     * @param content 内容
     * @param css [可选]样式
     */
  private static show(content: string, css?: string) {
    console.log(content, css)
  }
}
