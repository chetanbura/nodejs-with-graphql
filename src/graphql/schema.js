export const typeDefs = `
  enum USER_STATUS_ENUM {
    active
    blocked
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    status: USER_STATUS_ENUM
    createdAt: String
    updatedAt: String
  }

  type SignInResponse {
    token: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    status: USER_STATUS_ENUM
  }

  type UpdateUserResponse {
    user: User
    message: String!
  }

  type DeleteUserResponse {
    userId: ID
    message: String!
  }

  type Blog {
    id: ID!
    title: String
    content: String
    userId: String
    createdAt: String
    updatedAt: String
  }

  input BlogInput {
    id: ID
    title: String
    content: String
  }

  type BlogResponse {
    blog: Blog
    message: String!
  }

  type DeleteBlogResponse {
    blogId: ID
    message: String!
  }

  type Comment {
    id: ID!
    title: String
    content: String
    blogId: String
    userId: String
    createdAt: String
    updatedAt: String
  }

  type CommentResponse {
    comment: Comment
    message: String!
  }

  type DeleteCommentResponse {
    commentId: ID
    message: String!
  }

  input CommentInput {
    id: ID
    title: String
    content: String
    blogId: String
  }

  type Query {
    user: User!
    users: [User]
    blog(id: ID!): Blog!
    blogs: [Blog]
    comment(id: ID!): Comment!
    comments: [Comment]
  }

  type Mutation {
    signIn(input: SignInInput!): SignInResponse!
    signUp(input: SignUpInput!): User!
    updateUser(input: UpdateUserInput!): UpdateUserResponse
    deleteUser(id: ID!): DeleteUserResponse
    createBlog(input: BlogInput!): BlogResponse
    updateBlog(input: BlogInput!): BlogResponse
    deleteBlog(id: ID!): DeleteBlogResponse
    createComment(input: CommentInput!): CommentResponse
    updateComment(input: CommentInput!): CommentResponse
    deleteComment(id: ID!): DeleteCommentResponse
  }
`;
