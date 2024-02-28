export async function POST(request) {
    const { email, password } = request.body;
    const user = await db.user.findOne({
        where: {
        email
        }
    });
    if (user) {
        return {
        status: 400,
        body: {
            message: 'User already exists'
        }
        };
    }
    const newUser = await db.user.create({
        data: {
        email,
        password
        }
    });
    return {
        status: 200,
        body: {
        message: 'User created'
        }
    };
}