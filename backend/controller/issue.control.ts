import { User } from "@prisma/client";
import { Request, Response } from "express";
import generateStatusResponse from "../lib/statusResponseGenerator";
import { z } from "zod";
import { issueTypes } from "../lib/constant";
import { db } from "../lib/db";

const createIssueSchema = z.object({
  type: z.enum(issueTypes),
  title: z.string().trim().min(1, { message: "Please fill title" }),
  description: z.string().trim().min(1, { message: "Please fill description" }),
  images: z
    .string()
    .array()
    .max(10, { message: "The images must not exceed 10 files" })
    .optional(),
});

const updateIssueSchema = z.object({
  type: z.enum(issueTypes).optional(),
  title: z.string().trim().min(1, { message: "Please fill title" }).optional(),
  description: z
    .string()
    .trim()
    .min(1, { message: "Please fill description" })
    .optional(),
  images: z
    .string()
    .array()
    .max(10, { message: "The images must not exceed 10 files" })
    .optional(),
});

const adminUpdateIssueSchema = z.object({
  resolveMessage: z
    .string()
    .trim()
    .min(1, { message: "Please fill resolve message" }),
});

//=============================================================================

//@desc     Get all reported issue
//@route    GET /issues
//@access   Private

export const getIssues = async (req: Request, res: Response) => {
  const user: User = req.body.user;

  if (user.role === "Admin") {
    const issuesRes = await db.issue.findMany({
      include: {
        user: {
          select: { displayName: true, firstName: true, lastName: true },
        },
        resolver: {
          select: { displayName: true, firstName: true, lastName: true },
        },
      },
    });
    return res.send(issuesRes);
  } else {
    const issuesRes = await db.issue.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: {
          select: { displayName: true, firstName: true, lastName: true },
        },
        resolver: {
          select: { displayName: true, firstName: true, lastName: true },
        },
      },
    });
    return res.send(issuesRes);
  }
};

//@desc     Get specific issue
//@route    GET /issues/:issueId
//@access   Private

export const getIssue = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const user: User = req.body.user;

  try {
    if (issueId.length != 24 || /[0-9A-Fa-f]{24}/g.test(issueId) === false) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    const issueRes = await db.issue.findUnique({
      where: {
        id: issueId,
      },
      include: {
        user: {
          select: { displayName: true, firstName: true, lastName: true },
        },
        resolver: {
          select: { displayName: true, firstName: true, lastName: true },
        },
      },
    });

    if (!issueRes) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    if (user.role !== "Admin" && issueRes.userId !== user.id) {
      return res
        .status(403)
        .send(
          generateStatusResponse(
            403,
            "You don't have permission to view this issue"
          )
        );
    }

    return res.send(issueRes);
  } catch (err) {
    return res.status(404).send(generateStatusResponse(404, err));
  }
};

//@desc     Create reported issue
//@route    POST /issues
//@access   Private

export const createIssue = async (req: Request, res: Response) => {
  const user: User = req.body.user;
  const body = req.body;

  try {
    if (user.role === "Admin") {
      return res
        .status(403)
        .send(generateStatusResponse(403, "Admin cannot report the issue"));
    }

    const parseStatus = createIssueSchema.safeParse(body);
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success)
      return res
        .status(400)
        .send(generateStatusResponse(400, parseStatus.error.message));

    const parsedBody = parseStatus.data;

    const issueRes = await db.issue.create({
      data: {
        userId: user.id,
        ...parsedBody,
      },
    });

    return res.status(201).send(issueRes);
  } catch (err) {
    return res.status(400).send(generateStatusResponse(400, err));
  }
};

//@desc     Update specific issue
//@route    PUT /issues/:issueId
//@access   Private

export const updateIssue = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const user: User = req.body.user;
  const body = req.body;

  try {
    if (issueId.length != 24 || /[0-9A-Fa-f]{24}/g.test(issueId) === false) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    const parseStatus = updateIssueSchema.safeParse(body);
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success)
      return res
        .status(400)
        .send(generateStatusResponse(400, parseStatus.error.message));

    const parsedBody = parseStatus.data;

    const findIssueRes = await db.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!findIssueRes) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    if (findIssueRes.userId !== user.id) {
      return res
        .status(403)
        .send(
          generateStatusResponse(
            403,
            "You don't have permission to edit this issue"
          )
        );
    }

    const updateIssueRes = await db.issue.update({
      where: {
        id: issueId,
      },
      data: {
        ...parsedBody,
        reportAt: new Date(),
      },
    });

    return res.send(updateIssueRes);
  } catch (err) {
    return res.status(400).send(generateStatusResponse(400, err));
  }
};

//@desc     Delete specific issue
//@route    DELETE /issues/:issueId
//@access   Private

export const deleteIssue = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const user: User = req.body.user;

  try {
    if (issueId.length != 24 || /[0-9A-Fa-f]{24}/g.test(issueId) === false) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    const findIssueRes = await db.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!findIssueRes) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    if (findIssueRes.userId !== user.id) {
      return res
        .status(403)
        .send(
          generateStatusResponse(
            403,
            "You don't have permission to delete this issue"
          )
        );
    }

    const deleteIssueRes = await db.issue.delete({
      where: {
        id: issueId,
      },
    });

    return res.send(generateStatusResponse(200));
  } catch (err) {
    return res.status(400).send(generateStatusResponse(400, err));
  }
};

//@desc     Resolve specific issue
//@route    PUT /issues/:issueId/resolve
//@access   Private

export const resolveIssue = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const user: User = req.body.user;
  const body = req.body;

  try {
    if (issueId.length != 24 || /[0-9A-Fa-f]{24}/g.test(issueId) === false) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    const parseStatus = adminUpdateIssueSchema.safeParse(body);
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success)
      return res
        .status(400)
        .send(generateStatusResponse(400, parseStatus.error.message));

    const parsedBody = parseStatus.data;

    const findIssueRes = await db.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!findIssueRes) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    if (findIssueRes.status !== "Waiting") {
      return res
        .status(403)
        .send(
          generateStatusResponse(
            403,
            "This issue had already been resolved or rejected"
          )
        );
    }

    const updateIssueRes = await db.issue.update({
      where: {
        id: issueId,
      },
      data: {
        resolverId: user.id,
        status: "Resolved",
        ...parsedBody,
        resolveAt: new Date(),
      },
    });

    return res.send(updateIssueRes);
  } catch (err) {
    return res.status(400).send(generateStatusResponse(400, err));
  }
};

//@desc     Reject specific issue
//@route    PUT /issues/:issueId/reject
//@access   Private

export const rejectIssue = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const user: User = req.body.user;
  const body = req.body;

  try {
    if (issueId.length != 24 || /[0-9A-Fa-f]{24}/g.test(issueId) === false) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    const parseStatus = adminUpdateIssueSchema.safeParse(body);
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success)
      return res
        .status(400)
        .send(generateStatusResponse(400, parseStatus.error.message));

    const parsedBody = parseStatus.data;

    const findIssueRes = await db.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!findIssueRes) {
      return res
        .status(404)
        .send(generateStatusResponse(404, "No issue found"));
    }

    if (findIssueRes.status !== "Waiting") {
      return res
        .status(403)
        .send(
          generateStatusResponse(
            403,
            "This issue had already been resolved or rejected"
          )
        );
    }

    const updateIssueRes = await db.issue.update({
      where: {
        id: issueId,
      },
      data: {
        resolverId: user.id,
        status: "Rejected",
        ...parsedBody,
        resolveAt: new Date(),
      },
    });

    return res.send(updateIssueRes);
  } catch (err) {
    return res.status(400).send(generateStatusResponse(400, err));
  }
};
