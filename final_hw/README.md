# 在线课程平台 API 文档

## 基础信息
- 基础URL: `http://localhost:3000/api`
- 请求头: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (需要认证的接口)

## API 列表

### 1. 认证接口

#### 1.1 登录
- 路径: `POST /auth/login`
- 描述: 用户登录获取token
- 请求体:
```json
{
    "username": "string",
    "password": "string"
}
```
- 响应体:
```json
{
    "code": 0,
    "data": {
        "token": "string",
        "user": {
            "id": "string",
            "username": "string",
            "role": "STUDENT|TEACHER",
            "nickname": "string",
            "avatar": "string"
        }
    }
}
```

#### 1.2 注册
- 路径: `POST /auth/register`
- 描述: 用户注册
- 请求体:
```json
{
    "username": "string",
    "password": "string",
    "email": "string",
    "role": "STUDENT|TEACHER"
}
```

### 2. 课程接口

#### 2.1 获取课程列表
- 路径: `GET /courses`
- 描述: 获取课程列表，支持分页和筛选
- 查询参数:
  - `page`: 页码 (默认1)
  - `size`: 每页数量 (默认10)
  - `category`: 课程分类
  - `keyword`: 搜索关键词
- 响应体:
```json
{
    "code": 0,
    "data": {
        "total": "number",
        "list": [
            {
                "id": "string",
                "title": "string",
                "description": "string",
                "coverImage": "string",
                "teacherName": "string",
                "enrollCount": "number",
                "price": "number",
                "createdAt": "string"
            }
        ]
    }
}
```

#### 2.2 获取课程详情
- 路径: `GET /courses/:id`
- 描述: 获取课程详细信息
- 响应体:
```json
{
    "code": 0,
    "data": {
        "id": "string",
        "title": "string",
        "description": "string",
        "coverImage": "string",
        "teacherId": "string",
        "teacherName": "string",
        "chapters": [
            {
                "id": "string",
                "title": "string",
                "lessons": [
                    {
                        "id": "string",
                        "title": "string",
                        "type": "video|document",
                        "duration": "number",
                        "url": "string"
                    }
                ]
            }
        ]
    }
}
```

### 3. 学生接口

#### 3.1 注册课程
- 路径: `POST /student/courses/:courseId/enroll`
- 描述: 学生注册课程
- 响应体:
```json
{
    "code": 0,
    "data": {
        "enrollmentId": "string"
    }
}
```

#### 3.2 提交作业
- 路径: `POST /student/assignments/:id/submit`
- 描述: 提交作业
- 请求体:
```json
{
    "content": "string",
    "attachments": ["string"]
}
```

### 4. 教师接口

#### 4.1 创建课程
- 路径: `POST /teacher/courses`
- 描述: 创建新课程
- 请求体:
```json
{
    "title": "string",
    "description": "string",
    "coverImage": "string",
    "price": "number",
    "chapters": [
        {
            "title": "string",
            "lessons": [
                {
                    "title": "string",
                    "type": "video|document",
                    "url": "string"
                }
            ]
        }
    ]
}
```

#### 4.2 布置作业
- 路径: `POST /teacher/assignments`
- 描述: 布置新作业
- 请求体:
```json
{
    "courseId": "string",
    "title": "string",
    "description": "string",
    "dueDate": "string",
    "attachments": ["string"]
}
```

## 错误码说明
| 错误码 | 说明             |
| ------ | ---------------- |
| 0      | 成功             |
| 1001   | 用户名或密码错误 |
| 1002   | 用户不存在       |
| 2001   | 课程不存在       |
| 2002   | 无权访问         |
| 3001   | 参数错误         |
| 5001   | 服务器错误       |

## 注意事项
1. 文件上传接口需使用 `multipart/form-data`
2. 所有时间格式使用 ISO 8601
3. 文件大小限制: 50MB
4. API 调用频率限制: 100次/分钟