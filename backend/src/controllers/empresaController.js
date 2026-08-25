import bcrypt from 'bcrypt';
import Empresa from '../models/Empresa.js';
import {validarCnpj, normalizarCnpj} from "../utils/validarCnpj.js";

export const criarEmpresa = async (req, res) => {
  try {
    const {
      nome,
      email,
      cnpj,
      telefone,
      senha,
      status,
    } = req.body;

    if (!nome || !email || !cnpj || !senha) {
      return res.status(400).json({
        mensagem: "Nome, email, CNPJ e senha são obrigatórios."
      });
    }

    // Normalizar CNPJ
    const cnpjNormalizado = normalizarCnpj(cnpj);

    // Validar dígitos do CNPJ
    if (!validarCnpj(cnpjNormalizado)) {
      return res.status(400).json({
        mensagem: "CNPJ inválido."
      });
    }
    const empresaEmail = await Empresa.findOne({
      where: { email }
    });

    if (empresaEmail) {
      return res.status(409).json({
        mensagem: "Esse email já foi cadastrado."
      });
    }

    // Verificar CNPJ duplicado
    const empresaCnpj = await Empresa.findOne({
      where: {
        cnpj: cnpjNormalizado
      }
    });

    if (empresaCnpj) {
      return res.status(409).json({
        mensagem: "Já existe uma empresa cadastrada com este CNPJ."
      });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const empresa = await Empresa.create({
      nome,
      email,
      cnpj: cnpjNormalizado,
      telefone,
      senha_hash,
      status: status || "ativo",
    });

    return res.status(201).json({
      mensagem: "Empresa cadastrada com sucesso.",
      empresa: {
        id: empresa.id,
        nome: empresa.nome,
        email: empresa.email,
        cnpj: empresa.cnpj,
        telefone: empresa.telefone,
        status: empresa.status,
        data_cadastro: empresa.data_cadastro
      }
    });

  } catch (error) {
    console.error("Erro ao criar a empresa:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar a empresa."
    });
  }
};

export const listarEmpresas = async (req, res) =>{
    try{
        const empresas = await Empresa.findAll({
            attributes:{
                exclude: ['senha_hash'],
            },
            order: [['id', 'DESC']],
        });

        return res.status(200).json(empresas);
    }
    catch(error){
        console.error('Erro ao listar as empresas:', error);

        res.status(400).json({message:'Erro interno ao listar as empresas.'});
    }
}

export const buscarEmpresaPorId = async (req, res) => {
    try{
        const {id} = req.params;

        const empresa = await Empresa.findByPk(id, {
            attributes: {
                exclude: ['senha_hash']
            }
        });

        if(!empresa){
            return res.status(404).json({
                message: 'Empresa não encontrada.'
            });
        }

        return res.status(200).json(empresa);
    }
    catch(error){
        console.error('Erro ao encontrar empresa:', error);

        res.status(500).json({message: 'Erro interno do servidor para buscar empresa.'});
    }
}

export const atualizarEmpresa = async (req, res) => {
    try{
        const {id} = req.params;

        const {
            nome,
            email,
            cnpj,
            telefone,
            senha,
            status
        } = req.body;

        const empresa = await Empresa.findByPk(id);

        if(!empresa){
            return res.status(404).json({
                message: 'Empresa não encontrada.'
            });
        }

        if(email && email !== empresa.email){
            const emailExistente = await Empresa.findOne({where: {email}});

            if(emailExistente){
                return res.status(409).json({
                    message: 'Este email já está sendo utilizado por outra empresa.'
                });
            }
        }

        if(cnpj && cnpj !== empresa.cnpj){
            const cnpjExistente = await Empresa.findOne({
                where: {cnpj},
            });

            if(cnpjExistente){
                return res.status(409).json({
                    message: 'Este CNPJ já está sendo utilizado por outra empresa.',
                });
            }
        }
        
        if (nome !== undefined) {
          empresa.nome = nome;
        }

        if (email !== undefined) {
          empresa.email = email;
        }

        if (cnpj !== undefined) {
          empresa.cnpj = cnpj;
        }

        if (telefone !== undefined) {
          empresa.telefone = telefone;
        }

        if (status !== undefined) {
          empresa.status = status;
        }

        if (senha) {
          empresa.senha_hash = await bcrypt.hash(senha, 10);
        }

        await empresa.save();
    
        return res.status(200).json({
            mensagem: "Empresa atualizada com sucesso.",
            empresa: {
                id: empresa.id,
                nome: empresa.nome,
                email: empresa.email,
                cnpj: empresa.cnpj,
                telefone: empresa.telefone,
                status: empresa.status,
                data_cadastro: empresa.data_cadastro
            }
        });
    }
    catch(error){
        console.error("Erro ao atualizar empresa:", error);

        return res.status(500).json({
          mensagem: "Erro interno ao atualizar empresa."
        });            
    }
}

export const excluirEmpresa = async (req, res) => {
    try{
        const {id} = req.params;
        
        const empresa = await Empresa.findByPk(id);

        if(!empresa){
            return res.status(404).json({
                message: 'Empresa não encontrada.'
            })
        }
        
        await empresa.destroy();

        return res.status(200).json({
          mensagem: "Empresa excluída com sucesso."
        });
    }
    catch (error) {
        console.error("Erro ao excluir empresa:", error);

        return res.status(500).json({mensagem: "Erro interno ao excluir empresa."});
    }
}