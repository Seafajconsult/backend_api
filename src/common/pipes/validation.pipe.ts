import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: this.formatErrors(errors),
      });
    }

    return object;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]): Record<string, string[]> {
    return errors.reduce((acc, error) => {
      const constraints = error.constraints || {};
      const messages = Object.values(constraints);

      // Handle nested validation errors
      if (error.children && error.children.length > 0) {
        const nestedErrors = this.formatErrors(error.children);
        Object.keys(nestedErrors).forEach(key => {
          acc[`${error.property}.${key}`] = nestedErrors[key];
        });
      } else {
        acc[error.property] = messages;
      }

      return acc;
    }, {} as Record<string, string[]>);
  }
}

// Usage in main.ts:
// app.useGlobalPipes(new ValidationPipe());
