/**
 * @openapi
 * /v1/user:
 *  get:
 *      tags:
 *          - User
 *      summary: Get all users
 *      responses:
 *          200:
 *              description: Successfully retrieved all users
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          required:
 *                              - results
 *                              - metadata
 *                          properties:
 *                              results:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/User'
 *                              metadata:
 *                                  $ref: '#/components/schemas/Metadata'
 * 
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorNotAuthorized'
 * 
 *          403:
 *              description: Forbidden
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorForbidden'
 * 
 *          500:
 *              description: InternalServer
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorInternalServer'
 * 
 *  post:
 *      tags:
 *          - User
 *      summary: Create a new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json: 
 *                  schema:
 *                      $ref: '#/components/schemas/UserCreate'
 *      responses:
 *          201:
 *              description: Successfully retrieved all users
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          required:
 *                              - results
 *                              - metadata
 *                          properties:
 *                              results:
 *                                  $ref: '#/components/schemas/User'
 *                              metadata:
 *                                  $ref: '#/components/schemas/Metadata'
 *
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorNotAuthorized'
 *
 *          403:
 *              description: Forbidden
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorForbidden'
 *
 *          500:
 *              description: InternalServer
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorInternalServer'
 * 
 * 
 * /v1/user/{userId}:
 *  put:
 *      tags:
 *          - User
 *      summary: Update user by Id
 *      parameters:
 *          - name: userId
 *            in: path
 *            required: true
 *            description: User ID
 *            schema:
 *               type: string   
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserUpdate'
 *      responses:
 *          201:
 *              description: Successfully update user
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          required:
 *                              - results
 *                              - metadata
 *                          properties:
 *                              results:
 *                                  $ref: '#/components/schemas/User'
 *                              metadata:
 *                                  $ref: '#/components/schemas/Metadata'
 *
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorNotAuthorized'
 *
 *          403:
 *              description: Forbidden
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorForbidden'
 *
 *          500:
 *              description: InternalServer
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorInternalServer'
 * 
 *  delete:
 *      tags:
 *          - User
 *      summary: Delete user by Id
 *      parameters:
 *          - name: userId
 *            in: path
 *            required: true
 *            description: User ID
 *            schema:
 *               type: string
 *      responses:
 *          201:
 *              description: Successfully deleted user
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          required:
 *                              - results
 *                              - metadata
 *                          properties:
 *                              results:
 *                                  $ref: '#/components/schemas/User'
 *                              metadata:
 *                                  $ref: '#/components/schemas/Metadata'
 *
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorNotAuthorized'
 *
 *          403:
 *              description: Forbidden
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorForbidden'
 *
 *          500:
 *              description: InternalServer
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorInternalServer'
 *
 *  get:
 *      tags:
 *          - User
 *      summary: Get user by Id
 *      parameters:
 *          - name: userId
 *            in: path
 *            required: true
 *            description: User ID
 *            schema:
 *               type: string
 *      responses:
 *          201:
 *              description: Successfully got user
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          required:
 *                              - results
 *                              - metadata
 *                          properties:
 *                              results:
 *                                  $ref: '#/components/schemas/User'
 *                              metadata:
 *                                  $ref: '#/components/schemas/Metadata'
 *
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorNotAuthorized'
 *
 *          403:
 *              description: Forbidden
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorForbidden'
 *
 *          500:
 *              description: InternalServer
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorInternalServer'
 *
 * /v1/user/page:
 *  get:
 *      tags:
 *          - User
 *      summary: Get users by page and limit
 *      parameters:
 *          - name: page
 *            in: query
 *            required: true
 *            description: Current page number
 *            schema:
 *               type: number
 *          - name: limit
 *            in: query
 *            required: true
 *            description: Page limit
 *            schema:
 *               type: number
 *      responses:
 *          200:
 *              description: Successfully retrieved users by page and limit
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          required:
 *                              - results
 *                              - metadata
 *                          properties:
 *                              results:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/User'
 *                              metadata:
 *                                  $ref: '#/components/schemas/Metadata'
 *
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorNotAuthorized'
 *
 *          403:
 *              description: Forbidden
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorForbidden'
 *
 *          500:
 *              description: InternalServer
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorInternalServer'
 *
 *
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - userId
 *              - name
 *              - lastname
 *              - email
 *              - age
 *              - sex
 *          properties:
 *              userId:
 *                  type: string
 *                  example: bd6a236e-bbe4-4330-b7b5-b3ec982518e4
 *                  description: User ID
 *              name:
 *                  type: string
 *                  example: John
 *                  description: User name
 *              lastname:
 *                  type: string
 *                  example: Doe
 *                  description: User lastname
 *              email:
 *                  type: string
 *                  example: john.doe@email.com
 *                  description: User email
 *              age:
 *                  type: integer
 *                  example: 30
 *                  description: User age
 *              sex:
 *                  type: string
 *                  example: FEMALE
 *                  description: User sex
 * 
 * 
 *      UserCreate:
 *          type: object
 *          required:
 *              - name
 *              - lastname
 *              - email
 *              - password
 *              - age
 *              - sex
 *          properties:
 *              name:
 *                  type: string
 *                  example: John
 *                  description: User name
 *              lastname:
 *                  type: string 
 *                  example: Doe  
 *                  description: User lastname
 *              email:
 *                  type: string
 *                  example: john.doe@email.com
 *                  description: User email
 *              password:
 *                  type: string
 *                  example: 123456
 *                  description: User password
 *              age:
 *                  type: integer
 *                  example: 30 
 *                  description: User age
 * 
 *      UserUpdate:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: John
 *                  description: User name
 *              lastname:
 *                  type: string
 *                  example: Doe
 *                  description: User lastname
 *              email:
 *                  type: string
 *                  example: john.doe@email.com
 *                  description: User email
 *              password:
 *                  type: string
 *                  example: 123456
 *                  description: User password
 *              age:
 *                  type: integer
 *                  example: 30
 *                  description: User age
 */