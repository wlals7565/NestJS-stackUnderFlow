import { Exclude } from 'class-transformer';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { Vote } from 'src/post/entities/vote.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Recommendation } from 'src/recommendation/entities/recommendation.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ default: true })
  isCertified: boolean;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Vote, (vote) => vote.voter)
  votes: Vote[];

  @OneToMany(
    () => Recommendation,
    (Recommendation) => Recommendation.recommender,
  )
  recommendations: Recommendation[];

  @OneToMany(() => Reply, (reply) => reply.author)
  replies: Reply[];

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;
}
