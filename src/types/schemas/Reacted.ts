import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ASchema } from './ASchema';
import { Community } from './Community';
import { Media } from './Media';
import { Post } from './Post';
import { Reaction } from './Reaction';

/**
 * JSON Schema definition of reacted content
 */
export class Reacted extends ASchema<Reacted> {
  /**
   * name of the entity's type
   */
  @IsString()
  type!: string;

  @ValidateNested()
  @Type(() => ASchema, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: Media, name: 'media' },
        { value: Post, name: 'post' },
        { value: Community, name: 'community' },
      ],
    },
  })
  entity!: Media | Post | Community | null;

  /**
   * JSON Schema definition of reaction property
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => Reaction)
  reaction?: Reaction;
}
