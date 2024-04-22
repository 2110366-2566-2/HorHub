import { Request, Response } from "express";
import { createRoomType } from "../controller/dorm.control";
import { db } from "../lib/db";

describe('createRoomType', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
  
    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;
    });

    afterEach(async () => {
      await db.roomType.deleteMany({
        where: {
          dormId: '661fea71c25bcca881b9da25',
          dorm: {
            providerId: '65f1b1304a3b0ba9030fe6ee'
          }
        }
      })
    })

    it('Test 1: should return 400 if name is empty', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 2: should return 400 if name has more than 100 characters', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "ThisIsRoomThisIsRoomThisIsRoomThisIsRoomThisIsRoomThisIsRoomThisIsRoomThisIsRoomThisIsRoomThisIsRooms",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 3: should return 400 if description is empty', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 4: should return 400 if description has more than 5000 characters', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "ThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJaThisIsDescriptionsJa.",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 5: should return 400 if images have more than 5 items', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20",
              "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"
              ],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 6: should return 400 if size is 0', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 0,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 7: should return 400 if size is more than 10000000', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 18888888,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 8: should return 400 if size is not integer', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 888.88,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 9: should return 400 if capacity is 0', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 0,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 10: should return 400 if capacity is more than 10000000', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 18888888,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 11: should return 400 if capacity is not integer', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 88.88,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 12: should return 400 if price is less than 300.00', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 299,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 13: should return 400 if price is more than 200000.00', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 288888,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 14: should return 400 if price has more than 2 decimal places', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 8888.8877,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 15: should return 400 if there is invalid facilities in roomFacilities', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["conan"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })

    it('Test 16: should return 400 if there is duplicate facilities in roomFacilities', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed", "bunkbed", "bunkbed", "bunkbed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400) // Bad Request
        expect(res.send).toHaveBeenCalledWith('Invalid Data');
    })



    it('Test 17: should return 404 if dormId is not valid (does not have 24 chars of hexadecimal)', async () => {
        req = {
            params: {
              dormId: 'sawaddeekrub1234',   // Invalid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404) // Not Found
    })

    it('Test 18: should return 404 if dormId is not valid (have 24 chars of hexadecimal but dorm is not in database)', async () => {
        req = {
            params: {
              dormId: '111111111111111111111111',   // Invalid Dorm (Not in database)
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404) // Not Found
        expect(res.send).toHaveBeenCalledWith('No dorm found')
    })

    it("Test 19: should return 403 if user is not dorm's owner", async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',
            },
            body: {
              user: { id: '111111111111111111111111' },   // Not dorm's owner
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;

        await createRoomType(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(403) // Forbidden
        expect(res.send).toHaveBeenCalledWith("You don't have access to manage this dorm")
    })

    it('Test 20: should return 200 if dormId is valid and request body is valid', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;
        
        await createRoomType(req as Request, res as Response);
        
        expect(res.status).toHaveBeenCalledTimes(0) // No calling means success
        // expect(res.send).toHaveBeenCalledWith('Invalid Data');
    });

    it('Test 21: should return 200 if dormId is valid and request body is valid (there is no image)', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: [],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: ["singlebed"]
            },
        } as unknown as Request;
        
        await createRoomType(req as Request, res as Response);
        
        expect(res.status).toHaveBeenCalledTimes(0) // No calling means success
        // expect(res.send).toHaveBeenCalledWith('Invalid Data');
    });

    it('Test 22: should return 200 if dormId is valid and request body is valid (there is no facility)', async () => {
        req = {
            params: {
              dormId: '661fea71c25bcca881b9da25',   // Valid Dorm
            },
            body: {
              user: { id: '65f1b1304a3b0ba9030fe6ee' },
              name: "Hello",
              description: "Hi",
              images: ["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/rooms%2Fimages%2F1709999361422-IMG_5819.jpg?alt=media&token=3cbac322-bd9d-48d4-a37d-961329a25a20"],
              size: 100,
              cost: 400,
              capacity: 2,
              roomFacilities: [],
            },
        } as unknown as Request;
        
        await createRoomType(req as Request, res as Response);
        
        expect(res.status).toHaveBeenCalledTimes(0) // No calling means success
        // expect(res.send).toHaveBeenCalledWith('Invalid Data');
    });
  
    
  });