import { type ClassConstructor, plainToInstance, type TargetMap } from 'class-transformer'

export class ClassTransformerHelper {
  static parse<T>(from: Record<string, any>, to: ClassConstructor<T>, ...targetMaps: TargetMap[]): T {
    return plainToInstance(to, from, {
      // Expose/Exclude策略转换
      excludeExtraneousValues: true,
      // 自动隐式类型转换 貌似没什么用
      enableImplicitConversion: true,
      // 输出未匹配且含有默认值的字段
      exposeDefaultValues: true,
      // 输出undefined的字段
      exposeUnsetFields: true,
      // 关联对象自动转换
      enableCircularCheck: true,
      targetMaps,
    })
  }
}
