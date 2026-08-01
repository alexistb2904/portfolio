import "react";

declare module "react" {
	interface FormHTMLAttributes<T> {
		toolname?: string | Extract<T, never>;
		tooldescription?: string;
		toolautosubmit?: "" | "true";
	}

	interface HTMLAttributes<T> {
		toolparamdescription?: string | Extract<T, never>;
	}
}
