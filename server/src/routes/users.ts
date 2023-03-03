import { Request, Response, Router } from "express";
import userMiddleware from "../middlewares/user";
import { User } from "../entities/User";
import Post from "../entities/Post";
import Comment from "../entities/Comment";

const getUserData = async (req: Request, res: Response) => {
  try {
    //get user info
    const user = await User.findOneOrFail({
      where: { username: req.params.username },
      select: ["username", "createdAt"],
    });

    //get post info the user write
    const posts = await Post.find({
      where: { username: user.username },
      relations: ["comments", "votes", "sub"],
    });

    //get comment info the user write
    const comments = await Comment.find({
      where: { username: user.username },
      relations: ["post"],
    });
    if (res.locals.user) {
      const { user } = res.locals;
      posts.forEach((p) => p.setUserVote(user));
      comments.forEach((c) => c.setUserVote(user));
    }

    let userData: any[] = [];

    posts.forEach((p) => userData.push({ type: "Post", ...p.toJSON() }));
    comments.forEach((c) => userData.push({ type: "Comment", ...c.toJSON() }));

    //sorting data by newest
    userData.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });

    return res.json({ user, userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const router = Router();
router.get("/:username", userMiddleware, getUserData);

export default router;
