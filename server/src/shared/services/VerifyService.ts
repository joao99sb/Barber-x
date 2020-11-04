import { Request } from 'express';
import * as Yup from 'yup';

class VerifyService {
  public async create(req: Request): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().when(
        'password',
        (password: Yup.StringSchema, field: Yup.StringSchema) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      throw new Error('validation fail');
    }
  }

  public async update(req: Request): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when(
          'oldPassword',
          (oldPassword: Yup.StringSchema, field: Yup.StringSchema) =>
            oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when(
        'password',
        (password: Yup.StringSchema, field: Yup.StringSchema) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      throw new Error('validation fail');
    }
  }

  public async session(req: Request): Promise<void> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      throw new Error('validation fail');
    }
  }
}

export default new VerifyService();
