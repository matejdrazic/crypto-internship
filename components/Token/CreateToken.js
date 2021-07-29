import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const CreateToken = () => {
    return (
        <div>
            <div>
                <TextField
                    size="medium"
                    variant="outlined"
                    margin="normal"
                    required
                    id="token"
                    label="Token Name"
                    name="tokenname"
                    style={{ width: 300, margin: 10 }}
                    onChange={(e) => {
                    }}
                />
            </div>
            <div>
                <TextField
                    size="medium"
                    variant="outlined"
                    margin="normal"
                    required
                    id="symbol"
                    label="Token Symbol"
                    name="symbol"
                    style={{ width: 300, margin: 10 }}
                    onChange={(e) => {
                    }}
                />
                <div>
                </div>
                <TextField
                    size="medium"
                    variant="outlined"
                    margin="normal"
                    required
                    id="totalSupply"
                    label="Total Supply"
                    name="totalSupply"
                    type="number"
                    style={{ width: 300, margin: 10 }}
                    onChange={(e) => {
                    }}
                />
            </div>
            <div>
                <Button
                    class="button"
                    style={{ margin: 10 }}
                >Create a Token</Button>
            </div>
        </div>
    )
}

export default CreateToken