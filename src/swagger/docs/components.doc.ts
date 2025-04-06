/**
 * @openapi
 * components:
 *  schemas:
 *      Metadata:
 *          type: object
 *          required:
 *              - statusCode
 *          properties:
 *            statusCode:
 *              type: integer
 *              example: 200
 *              description: HTTP status code
 *            total:
 *              type: integer
 *              example: 150
 *              description: Total of items
 * 
 *      ErrorNotAuthorized:
 *          type: object
 *          required:
 *              - statusCode
 *              - status    
 *              - name
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 401
 *                  description: HTTP status code
 *              status:
 *                  type: string
 *                  example: Unauthorized
 *                  description: HTTP status
 *              name: 
 *                  type: string
 *                  example: NotAuthorizedException
 * 
 *      ErrorForbidden:
 *          type: object
 *          required:
 *              - statusCode
 *              - status
 *              - name
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 403
 *                  description: HTTP status code
 *              status:
 *                  type: string
 *                  example: Forbidden
 *                  description: HTTP status
 *              name:
 *                  type: string
 *                  example: ForbiddenException
 * 
 *      ErrorInternalServer:
 *          type: object
 *          required:
 *              - statusCode
 *              - status
 *              - name
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 500
 *                  description: HTTP status code
 *              status:
 *                  type: string
 *                  example: InternalServer
 *                  description: HTTP status
 *              name:
 *                  type: string
 *                  example: InternalServerException
 */