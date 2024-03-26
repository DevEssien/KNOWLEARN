import { GenericValidator } from "../../user/validators/index";
import { User } from "../../user/services/user.service";
import { NotFoundException, ServiceException, ValidationException } from "../../../libs/exceptions/index";
import { ErrorMessages } from "../../../libs/exceptions/messages";
import { comparePassword, generateJWT, Validate } from "../../../utils/index";
import { TokenFlag } from "../../../dto/app";
import { IServiceActionResult } from "../../../utils/serviceWrapper";

async function login(loginUserFields: GenericValidator) {
	const { email, password } = loginUserFields;
	const loginValidatableFields = new GenericValidator(email, password);

	const errors = await Validate(loginValidatableFields);

	if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_INPUT, errors);

	const user = await User.getUserByEmail(email);
	if (!user) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);

	const matchedPassword = await comparePassword(<string>password, user.password);
	if (!matchedPassword) throw new ServiceException("Invalid Password!");

	const token = await generateJWT({
		userId: user.id,
		flag: TokenFlag.AUTH,
		timestamp: Date.now(),
	});

	let responseData: IServiceActionResult;

	responseData = {
		message: "User Logged in Successfully",
		data: { ...user._doc, password: "hidden" },
		token: {
			flag: TokenFlag.AUTH,
			value: token,
		},
	};

	return responseData;
}

export default login;
